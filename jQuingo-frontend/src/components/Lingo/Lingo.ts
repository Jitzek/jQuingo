import { jQuingoComponent } from "@src/jquingo/component/component";
import style from "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";
import { GridComponent } from "@components/Lingo/Grid/Grid";
import { UserComponent } from "../User/User";
import { jQuingoHTTP } from "@src/jquingo/network/http";

export class LingoComponent extends jQuingoComponent {
    private user!: UserComponent;
    private topbar_component = new TopbarComponent();
    private grid_component = new GridComponent(
        () => this.handle_start(),
        () => this.handle_stop(),
        (value: string) => this.handle_submit(value)
    );

    private handle_start() {
        jQuingoHTTP.POST({
            url: "http://localhost:8000/lingo/create",
            dataType: "json",
            contentType: "application/json",
            data: {
                rows: 5,
                columns: 5,
            },
            onSucces: (data, status, request) => {
                this.user = new UserComponent(data["token"]);
                this.startGame(
                    data["first_letter"],
                    data["rows"],
                    data["columns"]
                );
            },
        });
    }

    private handle_stop() {}

    private handle_submit(value: string) {
        jQuingoHTTP.POST({
            url: "http://localhost:8000/lingo/submit-guess",
            dataType: "json",
            contentType: "application/json",
            data: {
                guess: value,
            },
            token: this.user.token,
            onSucces: (data, status, request) => {
                console.log(data);
                this.guessValue(data["guessedRight"], data["guessResult"], 250);
            },
        });
    }

    constructor() {
        super();
    }

    protected override init() {}

    public resetCounter(e: MouseEvent) {}

    public override template(): string {
        return `
            <!-- Example of scoped css implementation -->
            <div class="lingo ${style["lingo-container"]}">
              <div class="${style["topbar-container"]}">
                ${this.topbar_component.template()}
              </div>
              <div class="${style["grid-container"]}">
                ${this.grid_component.template()}
              </div>
            </div>
        `;
    }

    private stopGame() {
        this.grid_component.clearGrid().then(() => {
            this.grid_component = new GridComponent();
        });
    }

    public async startGame(
        first_letter: string,
        rows: number = 5,
        columns: number = 5
    ) {
        this.grid_component.createGrid(first_letter, rows, columns);
    }

    public handleWordInput() {}

    public async guessValue(guessed_right: boolean, guess_result: GuessResult, animation_time: number = 250): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                // Animate
                //

                this.grid_component.setRowValue(guess_result, animation_time).then(() => {
                    resolve();
                });


                // Wait for animation to finish
                // setTimeout(() => {
                //     resolve();
                // }, animation_time);
            }
        );
    }

    public async endGame() {
        // Clear grid
        await this.grid_component.clearGrid();

        // Give option to create new grid
    }
}

export type GuessResult = {
    letter: string;
    color: "red" | "yellow" | "grey";
}[];