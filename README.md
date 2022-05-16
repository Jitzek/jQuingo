# jQuingo
jQuery Lingo application using webpack.

NOTE: This project was a learning experience regarding webpack and jquery. Any other features in the project are experiments meant to see "what would happen if..." and "what if I...", hence they might lack quality and/or have bugs.

## Getting Started
This chapter will go over the versions used for developing the application and how the application can be prepped for use.

### NodeJS and NPM
- Node v16.13.2
- NPM v8.1.2

### Setup and Run
Install dependencies for frontend and backend:
`npm i --prefix /path/to/jQuingo-frontend/`
`npm i --prefix /path/to/jQuingo-backend/`

Run backend (will automatically build frontend):
`npm run start --prefix /path/to/jQuingo-backend/`

<br>

## Frontend
This chapter will go over the techniques used for developing the frontend.

### jquery
jQuingo mainly uses jquery for updating it's UI. 
It's also the biggest bottleneck when it comes to reducing overall bundle size. This is because it uses almost every modules (and atleast the largest) for the following reasons:
- ajax: For HTTP requests
- css: For changing css styling
- effects: For animations
- general: For DOM manipulation

### Renderloop
The main renderloop makes use of the `requestIdleCallback` method of the window. The callback will be called during the browser's idle periods. This is done to prevent the renderloop from blocking the UI.

Every iteration of the renderloop will update the `App`'s components recursively in the following manner:
1. The render function of a `jQuingoComponent` which the `App` extends, will return an array of `jQuingoNode`'s.
	The `container: HTMLElement` is the HTML parent to render into.
	`jQuingo::renderLoop(container: HTMLElement)` -> ```App::render().forEach((node) => {
		node.update(container)
	})```
2. A `node` can be either a `jQuingoComponentNode` or a `jQuingoTextNode`.
	
	A `jQuingoComponentNode` updates and renders HTMLElement logic, so things like it's properties (`class`, `style`, `id`, etc.) and it's element type (`p`, `span`, `div`, etc.).
	
	A `jQuingoTextNode` updates and renders the value of a `jQuingoComponentNode`. 
	
	e.g.: `<h1 class="header">Text</h1>`. In this example `h1` and it's `class` property is the `jQuingoComponentNode` and `Text` is the `jQuingoTextNode`. 
	
	Initially the `jQuingoNode::update` of a `jQuingoComponentNode` will only update the element's properties. Since simply rerendering the entire element will cause the UI to be constantly refreshing  which causes features like animations to constantly restart.
	Only when the underlying element type has changed, when deleted or replaced for example, will the element be rerendered.
	
	Same goes for the `jQuingoNode::update` of a `jQuingoTextNode`. It will only rerender the text when the initial text has changed.

### Components
A component in jQuingo is represented by a `jQuingoComponent` which can be extended. A component should always return a string of HTML which will be inspected every `jQuingo::renderLoop` iteration. Any changes to the HTML will then be updated in the UI.

#### Nodes
A component is made up of multiple nodes. A `node` can be either a `jQuingoComponentNode` or a `jQuingoTextNode`.

__Component Node__
A `jQuingoComponentNode` updates and renders HTMLElement logic, so things like it's properties (`class`, `style`, `id`, etc.) and it's element type (`p`, `span`, `div`, etc.).

Initially the `jQuingoNode::update` of a `jQuingoComponentNode` will only update the element's properties. Since simply rerendering the entire element will cause the UI to be constantly refreshing  which causes features like animations to constantly restart.
Only when the underlying element type has changed, when deleted or replaced for example, will the element be rerendered.

__Text Node__
A `jQuingoTextNode` updates and renders the value of a `jQuingoComponentNode`. 

The `jQuingoNode::update` of a `jQuingoTextNode` will only rerender the text when the initial text has changed.
	
An example differentiating a Component Node with a Text Node: 
`<h1 class="header">Text</h1>`. In this example `h1` and it's `class` property is the `jQuingoComponentNode` and `Text` is the `jQuingoTextNode`. 

### Rendering Components
Components have a `render()` method, which returns an array of `jQuingoNode`'s.

All Components have a `template()` which is a string containing all the HTML of the component. This HTML will be converted into `jQuingoNode`'s using the `jQuingo::createNodes` method:

```
HTML:
jQuingoComponent::template(): string {
	return `	
		<div class="container">
			<h1>Hello World</h1>
			<div>
				<a href="/">Click Me!</a>
			</div>
		</div>
	`
}
```
```
Renders HTML to jQuingoNodes's
jQuingo::render(): jQuingoNode[] {
	const new_template = this.template();
	if (new_template !== this._prev_template) {
		this.nodes = jQuingo.updateNodes(
			this.nodes,
			jQuingo.createNodes(new_template)
		);
		this._prev_template = new_template;
	}
	return this.nodes;
}
```
```
Returns the jQuingoNode's representation of the HTML:
[{
	type: "div",
	props: {
		class: "container"
	},
	children: [
		{
			type: "h1"
			props: {},
			children: [
 				"Hello World"
			]
		},
		{
			type: "div"
			props: {},
			children: [
				{
					type: "a",
					props: {
						href: "/"
					}
					children: [
						"Click Me!"
					]
				}
			]
		}
	]
}]
```

The `jQuingo::updateNodes` compares the previous template with the new template to see if anything has changed and update it to the new value if necessary.

### Callbacks
Callbacks can be baked within the HTML, though this feature is as of now far from perfect.

An example of a onclick callback:
```
class ButtonComponent extends jQuingoComponent {
	private handleButtonClick: jQuingoEventHandlerFunction =
		jQuingoEventHandler.on((e: Event) => {
			console.log("Hello World!");
		});

	public override template(): string {
		return `
			<button onclick="${this.handleButtonClick}">
				Click Me!
			</button>
		`
	}
}
```

`jQuingoEvenetHandler::on` will add the callback to a list of callbacks. This is not garbage collected, though it should.

Within the `jQuingoComponentNode::updateAttributes` function the code will look for the keyword 'on' and use the ID of the callback (which is the value of  the created `handleButtonClick: jQuingoEventHandlerFunction` variable) to create a new callback on the `Element` using the `on` function from jquery.
So in the HTML it will look like:
```
<button onclick="0">
	Click Me!
</button>
```
Where `0` is the ID of the `jQuingoEventHandlerFunction` variable.

### Router
The router, represented by the `jQuingoRouter` class allows for Single Page Application behaviour.

#### Routes
A route, or the URL path to a certain component is represented by a `jQuingoRoute`.
`jQuingoRoute` extends `jQuingoComponent` making it have the same functionality. The key difference is that a route has a `public`variable called `path` which should be set to the relative path of when to render the route component.
e.g.: 
```
import { jQuingoRoute } from "@src/jquingo/router/route";

export class HomeRoute extends jQuingoRoute {
  constructor() {
    super("/home");
  }

  public override template(): string {
    return `
      <div>
        <h1 class="test">Home</h1>
        <a href="/">Go to Root</a>
      </div>
    `;
  }
}
```
So when the url is for example: 'http://localhost/home', this component will be displayed.

<br>

The Router also overtakes elements with a `href` and overrides their behaviour by overriding the `onclick` behaviour of the document and changing the behaviour when the target element has a `href` attribute.


### Observable Value
The `ObservableValue` class allows values to be observed and to notify observees once a value has changed.
An observable value can be created by passing the value to a new instance of `ObservableValue`, e.g.:
`let observableString: ObservableValue<string> = new ObservableValue("Hello World!")`

A different entity can then subscribe to this value:
`let id = observableString.subscribe((new_value) => {
	console.log(new_value);
})`

To update the value and notify it's subscribers, call `ObservableValue::set(value: T)` or `ObservableValue::update(callback: value: T) => void)`.

To unsubscribe call using the ID gotten when subscribing `ObservableValue::unsubscribe(identifier: ObservableIdentifier)`

### Webpack
Webpack is a static module bundler which creates a dependency graph to be used to bundle all the javascript modules (files, images, fonts, javascript, css, html, etc.) into a single module.

Webpack also offers functions like merging modules, code minimization, typescript compiling, transpiling and other features. It bundles it into something that the web browser can understand.

#### Development and Production
The way the logic for development and production are seperated is with the use of `webpack-merge`:
1. The `package.json` offers the command `dev` and `build`, for development and production respectively.
	`dev` loads the `webpack.development.js` config file while `build` loads the `webpack.production.js` config file.
2. `webpack.development.js` and `webpack.production.js` both merge into the common config file called `webpack.config.js` as follows:
	```
	const common = require("./webpack.config.js");
	const { merge } = require("webpack-merge");
	
	module.exports = merge(common, {
		// Custom config here
	})
	```
3. Both `webpack.development.js` and `webpack.production.js` set the `process.env.NODE_ENV` to `"development"` and `"production respectively"`

##### Development
The development config file only really adds one thing, which is setting the `devtool` to `"source-map"`.
This is used to map compiled code back to original source code, so when an error occurs it can be easily tracked to the original source code.


<br>

## Backend
This chapter will go over the techniques used for developing the backend.

### JSON Web Tokens (JWT)
A JSON Web Token (JWT) is an access token, which makes it possible for two parties to securely exchange data. It contains all important information about an entity, meaning that no database queries are necessary and the session doesn’t need to be saved on the server.

#### General usage
1. User sends a request to the server to create a new Lingo Board.
2. The server receives the request to create a new Lingo Board, it verifies any given parameters and creates a new User and Board, both having a UUID.
The server will create a token using the UUIDs of the User and the Board, this token is signed using the server's secret key.
3. The user receives the token along with other information.
4. Any request given to the server will go through a middleware which verifies whether the token is valid (the creation of a new Lingo board will not have to be verified, since the token will be created there).

The values of the token (the UUIDs of the User and Board) can be retrieved on the server using the secret key and be used to make changes to the given Lingo Board played by the given Player.
