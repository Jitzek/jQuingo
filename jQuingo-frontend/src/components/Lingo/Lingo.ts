import { jQuingoComponent } from "@src/jquingo/component/component";
import style from "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";
import { GridComponent } from "@components/Lingo/Grid/Grid";
import { UserComponent } from "../User/User";
import { jQuingoHTTP, jQuingoPostData } from "@src/jquingo/network/http";

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
            data: {},
            onSucces: (data, status, request) => {
                console.info("Success");
                this.user = new UserComponent(
                    data["uuid"],
                    data["boardUuid"],
                    data["token"]
                );
                console.info(this.user);
            },
        });
    }

    private handle_stop() {}

    private handle_submit(value: string) {}

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

    public async startGame(rows: number = 5) {
        this.grid_component.createGrid();
    }

    public handleWordInput() {}

    public guessValue(value: string, animation_time: number): Promise<boolean> {
        return new Promise<boolean>(
            (resolve: (value: boolean | PromiseLike<boolean>) => void) => {
                // Determine if word was correct
                //

                // Animate
                //

                // Wait for animation to finish
                setTimeout(() => {
                    resolve(true);
                }, animation_time);
            }
        );
    }

    public async endGame() {
        // Clear grid
        await this.grid_component.clearGrid();

        // Give option to create new grid
    }
}
