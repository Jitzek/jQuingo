import express from "express";
import jwt from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";
import { Lingo } from "./src/Lingo/Lingo";
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

app.use(
    jwt({
        secret: `${process.env.JWT_SECRET_KEY}`,
        algorithms: ["sha1", "RS256", "HS256"],
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
    // Create User
    const user = new User();

    // Create board
    lingo.createBoard(user, 5, 5).then((board) => {
        // Create JWT token
        const token = generateAccessToken({
            uuid: user.uuid,
            boardUuid: board.uuid,
        });

        res.status(200).send({
            message: "Lingo Board Created",
            uuid: user.uuid,
            boardUuid: board.uuid,
            token: token,
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
