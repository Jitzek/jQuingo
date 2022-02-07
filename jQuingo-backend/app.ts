import express from "express";
import jwt from 'express-jwt';
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { sign, generateKeyPairSync } from "crypto";

// exports JWT_SECRET_KEY
config({ path: "./.secret.env" });

const PORT = 8000;
const app = express();

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
});

function generateAccessToken(data: Object) {
    return jsonwebtoken.sign(data, `${process.env.JWT_SECRET_KEY}`);
}

app.use(
    express.static(path.join(__dirname, "../", "jQuingo-frontend", "dist"))
);

app.use(
    jwt({
        secret: `${process.env.JWT_SECRET_KEY}`,
        algorithms: ['sha1', 'RS256', 'HS256'],
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

/**
 * Create Lingo Board
 */
app.post("/lingo/create", (req, res) => {
    const uuid: string = uuidv4();
    const token = generateAccessToken({ uuid: uuid });
    res.status(200).send({
        message: "Lingo Board Created",
        uuid: uuid,
        boardId: "TBD",
        token: token,
    });
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
