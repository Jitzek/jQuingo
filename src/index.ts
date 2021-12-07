import { jQuingo } from "./jquingo/jQuingo";
import { jQuingoRoute } from "./jquingo/router/route";
import { router } from "./jquingo/router/router";
import { HomeRoute } from "./routes/home";
import { RootRoute } from "./routes/root";

const jquingo = new jQuingo();
// Start the main render loop
jquingo.renderLoop(document.body);

// Dependency of App
new RootRoute();

// Additional routes
new HomeRoute();