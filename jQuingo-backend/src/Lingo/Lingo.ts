import { wordExists } from "../WordManager/WordManager";
import { Board } from "./Board/Board";
import { User } from "./User/User";

export class Lingo {
    private boards: Board[] = [];

    constructor() {}

    public async createBoard(
        user: User,
        rows: number,
        columns: number
    ): Promise<Board> {
        const new_board = new Board(user, rows, columns);
        await new_board.init();
        this.boards.push(new_board);
        return new_board;
    }

    public async submitGuess(
        board_uuid: string,
        user_uuid: string,
        guess: string
    ): Promise<LingoTrue | LingoFalse | LingoError> {
        guess = guess.toUpperCase();
        const board: Board | undefined = this.getBoardByUuid(board_uuid);
        if (board === undefined) return new LingoError("Board not found");
        if (!this.boardHasUserUuid(board, user_uuid))
            return new LingoError("User not found in current Board");

        if (guess.length !== board.columns) {
            return new LingoError(
                "Length of guess is not the same as the length of the word to be guessed"
            );
        }
        if (!(await wordExists(guess, "dutch"))) {
            return new LingoError("Word does not exist in our dictionary");
        }

        if (board.guesses++ >= board.columns) {
            return new LingoError("Guesses Exceeded");
        }

        return this.getGuessResult(board, guess);
    }

    private getGuessResult(
        board: Board,
        guess: string
    ): LingoTrue | LingoFalse {
        let result: GuessResult = [];
        for (let i = 0; i < board.word.length; i++) {
            // If guess's letter is in the same position as the word's letter
            if (guess[i] === board.word[i]) {
                // Red
                result.push({
                    letter: guess[i],
                    color: "red",
                });
                continue;
            }
            const letter_occurrence_board =
                board.word.split(guess[i]).length - 1;
            const amount_of_yellows = result.filter(
                (guess_result) =>
                    guess_result.letter === guess[i] && guess_result.color
            ).length;
            let amount_guessed = 0;
            for (let j = 0; j < board.word.length; j++) {
                amount_guessed +=
                    guess[i] === guess[j] && board.word[j] === guess[j] ? 1 : 0;
            }
            if (
                // If guess's letter occurs somwhere within the word
                board.word.indexOf(guess[i]) > -1 &&
                // The amount of yellows don't exceed the amount of matches
                amount_of_yellows < letter_occurrence_board &&
                // That letter has not been guessed yet
                amount_guessed < letter_occurrence_board
            ) {
                // Yellow
                result.push({
                    letter: guess[i],
                    color: "yellow",
                });
                continue;
            }
            // Grey
            result.push({
                letter: guess[i],
                color: "grey",
            });
            continue;
        }
        console.log(result);
        return new LingoTrue(result);
    }

    private getBoardByUuid(uuid: string): Board | undefined {
        return this.boards.find((board) => board.uuid === uuid);
    }

    private boardHasUserUuid(board: Board, user_uuid: string): boolean {
        return board.user.uuid === user_uuid;
    }
}

export type GuessResult = {
    letter: string;
    color: "red" | "yellow" | "grey";
}[];

export class LingoTrue {
    constructor(public guess_result: GuessResult) {}
}

export class LingoFalse {
    constructor(public guess_result: GuessResult) {}
}

export class LingoError {
    constructor(public message: string) {}
}
