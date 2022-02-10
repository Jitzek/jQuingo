import express from "express";
import jwt from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";
import { Lingo, LingoError, LingoFalse, LingoTrue } from "./src/Lingo/Lingo";
import { User } from "./src/Lingo/User/User";

// exports JWT_SECRET_KEY
config({ path: "./.secret.env" });

const PORT = 8000;
const app = express();

function generateAccessToken(data: Object) {
    return jsonwebtoken.sign(data, `${process.env.JWT_SECRET_KEY}`);
}

app.use(
    express.static(path.join(__dirname, "../", "jQuingo-frontend", "dist"))
);

app.use(express.json());

/**
 * Middleware which gets the JWT token from the headers (Authorization: Bearer [token])
 * and verifies it using the given secret key.
 */
app.post('*',(req, res, next) => {
    if (req.path === "/lingo/create") {
        next();
        return;
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jsonwebtoken.verify(
        token,
        `${process.env.JWT_SECRET_KEY}`,
        (error, auth) => {
            if (error) return res.sendStatus(403);
            req.body.auth = auth;
            next();
        }
    );
});
// app.use(
//     jwt({
//         secret: `${process.env.JWT_SECRET_KEY}`,
//         algorithms: ["HS256"],
//         requestProperty: "user"
//     }).unless({
//         path: ["/lingo/create"],
//     })
// );

// Return index.html of jQuingo
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../", "jQuingo-frontend", "dist", "index.html")
    );
});

const lingo = new Lingo();

/**
 * Create Lingo Board
 */
app.post("/lingo/create", (req, res) => {
    if (!req.body.rows || !req.body.columns) {
        res.status(400).send({
            message: 'Required parameters: "rows" and "columns" not found',
        });
        return;
    }
    const rows = Number(req.body.rows);
    const columns = Number(req.body.columns);
    if (isNaN(rows) || isNaN(columns)) {
        res.status(400).send({
            message: 'Parameters "rows" and "columns" should be numeric',
        });
        return;
    }

    // Create User
    const user = new User();

    // Create board
    lingo.createBoard(user, rows, columns).then((board) => {
        // Create JWT token
        const token = jsonwebtoken.sign(
            { uuid: user.uuid, boardUuid: board.uuid },
            `${process.env.JWT_SECRET_KEY}`
        );

        res.status(200).send({
            token: token,
            first_letter: board.word[0],
            rows: board.rows,
            columns: board.columns,
        });

        console.info(`[server]: Created board with word: ${board.word}`);
    });
});

/**
 * User submits guess
 */
app.post("/lingo/submit-guess", (req, res) => {
    if (!req.body.guess) {
        res.status(400).send({
            message: 'Required parameter: "guess" not found',
        });
        return;
    }

    lingo
        .submitGuess(
            req.body.auth.boardUuid,
            req.body.auth.uuid,
            req.body.guess
        )
        .then((lingo_result) => {
            if (lingo_result instanceof LingoError) {
                res.status(400).send({
                    message: lingo_result.message,
                });
                return;
            }

            res.status(200).send({
                guessedRight: lingo_result instanceof LingoTrue,
                guessResult: (lingo_result as LingoTrue | LingoFalse)
                    .guess_result,
            });
            return;
        });
});

app.listen(PORT, () => {
    console.info(`[server]: Server is running at http://localhost:${PORT}`);
});
