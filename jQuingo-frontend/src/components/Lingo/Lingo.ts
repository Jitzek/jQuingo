import { jQuingoComponent } from "@src/jquingo/component/component";
import style from "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";
import { GridComponent } from "@components/Lingo/Grid/Grid";
import { UserComponent } from "@components/User/User";
import { SettingsComponent } from "@src/components/Settings/Settings";
import { jQuingoHTTP } from "@src/jquingo/network/http";
import lingo_theme_song_mp3 from "@mp3/lingo-theme-song.mp3";
import lingo_win_mp3 from "@mp3/lingo-win.mp3";
import lingo_fail_mp3 from "@mp3/lingo-fail.mp3";
import {
    amount_of_columns_observable,
    amount_of_rows_observable,
} from "@src/observables/LingoSettings";

export class LingoComponent extends jQuingoComponent {
    private user!: UserComponent;
    private topbar_component = new TopbarComponent();
    private settings_component = new SettingsComponent();
    private theme_song = new Audio(lingo_theme_song_mp3);
    private rows: number = 5;
    private columns: number = 5;
    private game_in_progress = false;
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
                rows: this.rows,
                columns: this.columns,
            },
            onSucces: (data, status, request) => {
                this.user = new UserComponent(data["token"]);
                this.startGame(
                    data["first_letter"],
                    this.rows,
                    this.columns
                );
                this.game_in_progress = true;
            },
        });
    }

    private handle_stop() {
        this.stopMusic().then(() => {
            this.game_in_progress = false;
        });
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
                const guessed_right = data["guessedRight"] || false;
                const guess_result: RowValue = data["guessResult"] || [];
                if (guess_result === []) {
                    // Something went wrong
                    return;
                }
                this.guessValue(guessed_right, guess_result, 250).then(() => {
                    // Succesfully guessed word
                    if (guessed_right) {
                        this.stopMusic(0).then(() => {
                            const lingo_win_audio = new Audio(lingo_win_mp3);
                            lingo_win_audio.volume = 0.5;
                            lingo_win_audio.play();
                        });
                    }
                    // Failed to guess word and out of attempts
                    else if (
                        this.grid_component.current_row_index >= this.rows
                    ) {
                        this.stopMusic(0).then(() => {
                            const lingo_fail_audio = new Audio(lingo_fail_mp3);
                            lingo_fail_audio.volume = 0.5;
                            lingo_fail_audio.play();
                        });
                    }
                    // Didn't guess word but not out of attempts
                    else {
                        this.grid_component.setNextRowHint();
                    }
                });
            },
        });
    }

    constructor() {
        super();
        this.theme_song.loop = true;
        amount_of_rows_observable.subscribe((new_value) => {
            if (new_value === -1) new_value = 5;
            this.rows = new_value;
        });
        amount_of_columns_observable.subscribe((new_value) => {
            if (new_value === -1) new_value = 5;
            this.columns = new_value;
        });
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
            <div class="${style["settings-container"]} ${this.game_in_progress ? style["hidden"] : ''}">
                ${this.settings_component.template()}
            </div>
        `;
    }

    private startMusic(fadeInDuration: number = 1000): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                this.theme_song.volume = 0;
                this.theme_song.currentTime = 0;
                this.theme_song.play();
                const interval = setInterval(() => {
                    if (this.theme_song.volume >= 0.25) {
                        clearInterval(interval);
                        resolve();
                    }
                    if (this.theme_song.volume + 0.01 >= 0.25)
                        this.theme_song.volume = 0.25;
                    else this.theme_song.volume += 0.01;
                }, fadeInDuration / (0.25 / 0.01));
            }
        );
    }

    private async stopMusic(fadeOutDuration: number = 1000): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                const interval = setInterval(() => {
                    if (this.theme_song.volume <= 0) {
                        this.theme_song.pause();
                        this.theme_song.currentTime = 0;
                        clearInterval(interval);
                        resolve();
                    }
                    if (this.theme_song.volume - 0.01 <= 0)
                        this.theme_song.volume = 0;
                    else this.theme_song.volume -= 0.01;
                }, fadeOutDuration / (0.25 / 0.01));
            }
        );
    }

    public async startGame(
        first_letter: string,
        rows: number = 5,
        columns: number = 5
    ) {
        this.grid_component.createGrid(first_letter, rows, columns);
        this.startMusic();
    }

    public handleWordInput() {}

    public async guessValue(
        guessed_right: boolean,
        guess_result: RowValue,
        animation_time: number = 250
    ): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                this.grid_component
                    .insertRowGuess(guess_result, animation_time)
                    .then(() => {
                        resolve();
                    });
            }
        );
    }

    // public async endGame() {
    //     // Clear grid
    //     await this.grid_component.clearGrid();

    //     // Give option to create new grid
    // }
}

export type RowValue = {
    letter: string;
    color: "red" | "yellow" | "grey";
}[];
