import express from "express";
import jwt from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";
import { Lingo, LingoError, LingoFalse, LingoTrue } from "./src/Lingo/Lingo";
import { User } from "./src/Lingo/User/User";
import { json } from "body-parser";

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

app.use(json());

/**
 * Middleware which gets the JWT token from the headers (Authorization: Bearer [token])
 * and verifies it using the given secret key.
 */
app.use((req, res, next) => {
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

app.post("/", (req, res) => {
    console.info(req.header("Authorization"));
});

const lingo = new Lingo();

/**
 * Create Lingo Board
 */
app.post("/lingo/create", (req, res) => {
    console.log(req.body);
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
    });
});

/**
 * User submits guess
 */
app.post("/lingo/submit-guess", (req, res) => {
    console.log(req.body.auth.uuid);

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
        .then((guess_result) => {
            if (guess_result instanceof LingoError) {
                console.log(guess_result.message);
                res.status(400).send({
                    message: guess_result.message,
                });
                return;
            }

            res.status(200).send({
                guessedRight: guess_result instanceof LingoTrue,
                guessResult: (guess_result as LingoTrue | LingoFalse)
                    .guess_result,
            });
            return;
        });
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
