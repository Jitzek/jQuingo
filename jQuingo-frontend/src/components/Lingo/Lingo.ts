import { jQuingoComponent } from "@src/jquingo/component/component";
import style from "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";
import { GridComponent } from "@components/Lingo/Grid/Grid";
import { UserComponent } from "../User/User";
import { jQuingoHTTP } from "@src/jquingo/network/http";
import lingo_theme_song_mp3 from "@mp3/lingo-theme-song.mp3";

export class LingoComponent extends jQuingoComponent {
    private user!: UserComponent;
    private topbar_component = new TopbarComponent();
    private theme_song = new Audio(lingo_theme_song_mp3);
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

    private handle_stop() {
        const interval = setInterval(() => {
            if (this.theme_song.volume <= 0) {
                this.theme_song.pause();
                this.theme_song.currentTime = 0;
                clearInterval(interval);
            }
            if (this.theme_song.volume - 0.01 <= 0) this.theme_song.volume = 0;
            else this.theme_song.volume -= 0.01;
        }, 50);
    }

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
        this.theme_song.loop = true;
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

    public async startGame(
        first_letter: string,
        rows: number = 5,
        columns: number = 5
    ) {
        this.grid_component.createGrid(first_letter, rows, columns);
        this.theme_song.volume = 0;
        this.theme_song.currentTime = 0;
        this.theme_song.play();
        const interval = setInterval(() => {
            if (this.theme_song.volume >= 0.25)
                clearInterval(interval);
            if (this.theme_song.volume + 0.01 >= 0.25)
                this.theme_song.volume = 0.25;
            else this.theme_song.volume += 0.01;
        }, 50);
    }

    public handleWordInput() {}

    public async guessValue(
        guessed_right: boolean,
        guess_result: GuessResult,
        animation_time: number = 250
    ): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                this.grid_component
                    .setRowValue(guess_result, animation_time)
                    .then(() => {
                        resolve();
                    });

                // Wait for animation to finish
                // setTimeout(() => {
                //     resolve();
                // }, animation_time);
            }
        );
    }

    // public async endGame() {
    //     // Clear grid
    //     await this.grid_component.clearGrid();

    //     // Give option to create new grid
    // }
}

export type GuessResult = {
    letter: string;
    color: "red" | "yellow" | "grey";
}[];
