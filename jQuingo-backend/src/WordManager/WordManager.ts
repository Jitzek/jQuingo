import fs from "fs";
import readline from "readline";

export async function getWord(
    language: Language,
    length: number,
    regex: RegExp = /^/
): Promise<string> {
    return new Promise<string>(
        (resolve: (value: string | PromiseLike<string>) => void) => {
            const words: string[] = [];

            let wordlist = "";
            switch (language.toLowerCase()) {
                case "dutch":
                default:
                    wordlist = "src/WordManager/wordlists/nl.txt";
            }

            const stream = fs.createReadStream(wordlist, "utf8");

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });

            rl.on("line", (line) => {
                if (line.toLowerCase().length === length && regex.test(line)) {
                    words.push(line);
                }
            });

            rl.on("close", () => {
                resolve(words[Math.floor(Math.random() * words.length)]);
            });
        }
    );
}

export async function wordExists(
    word: string,
    language: Language
): Promise<boolean> {
    return new Promise<boolean>(
        (resolve: (value: boolean | PromiseLike<boolean>) => void) => {
            let found = false;

            let wordlist = "";
            switch (language.toLowerCase()) {
                case "dutch":
                default:
                    wordlist = "src/WordManager/wordlists/nl.txt";
            }

            const stream = fs.createReadStream(wordlist, "utf8");

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity,
            });

            rl.on("line", (line) => {
                if (line === word.toLowerCase()) {
                    found = true;
                    rl.close();
                    rl.removeAllListeners();
                }
            });

            rl.on("close", () => {
                resolve(found);
            });
        }
    );
}

export type Language = "dutch";
