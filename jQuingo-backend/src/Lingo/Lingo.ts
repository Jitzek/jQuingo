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

    public submitGuess(
        board_uuid: string,
        user_uuid: string
    ): LingoSucces | LingoError {
        const board: Board | undefined = this.getBoardByUuid(board_uuid);
        if (board === undefined) return new LingoError("Board not found");
        if (!this.boardHasUserUuid(board, user_uuid))
            return new LingoError("User not found in current Board");

        // TODO: guess submission logic

        return new LingoSucces("Guess succesfully submitted");
    }

    private getBoardByUuid(uuid: string): Board | undefined {
        return this.boards.find((board) => board.uuid === uuid);
    }

    private boardHasUserUuid(board: Board, user_uuid: string): boolean {
        return board.user.uuid === user_uuid;
    }
}

export class LingoSucces {
    constructor(public message: string) {}
}

export class LingoError {
    constructor(public message: string) {}
}
