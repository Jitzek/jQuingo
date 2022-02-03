import { jQuingo } from "./jquingo/jQuingo";
import { router } from "./jquingo/router/router";
import { HomeRoute } from "./routes/home";
import { RootRoute } from "./routes/root";

const jquingo = new jQuingo();
// Start the main render loop
jquingo.renderLoop(document.body);

// Dependency of App
router.addRoute('/', RootRoute);

// Additional routes
router.addRoute('/home', HomeRoute);