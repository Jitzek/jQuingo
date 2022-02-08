import express from "express";
import jwt from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";
import { Lingo } from "./src/Lingo/Lingo";
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
app.use(
    jwt({
        secret: `${process.env.JWT_SECRET_KEY}`,
        algorithms: ["HS256"],
        requestProperty: "auth",
    }).unless({
        path: ["/lingo/create"],
    })
);

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
    if (!req.body.rows || !req.body.columns) {
        res.status(400).send({
            message: "Required parameters: \"rows\" and \"columns\" not found"
        });
    }
    const rows = Number(req.body.rows);
    const columns = Number(req.body.columns);
    if (isNaN(rows) || isNaN(columns)) {
        res.status(400).send({
            message: "Parameters \"rows\" and \"columns\" should be numeric"
        });
    }

    // Create User
    const user = new User();

    // Create board
    lingo.createBoard(user, rows, columns).then((board) => {
        // Create JWT token
        const token = jsonwebtoken.sign({uuid: user.uuid, boardUuid: board.uuid}, `${process.env.JWT_SECRET_KEY}`);

        res.status(200).send({
            token: token,
            first_letter: 'A',
            rows: board.rows,
            columns: board.columns
        });
    });
});

/**
 * User submits guess
 */
app.post("/lingo/submit-guess", (req, res) => {});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
