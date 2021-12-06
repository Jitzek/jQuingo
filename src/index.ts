import { jQuingoComponent } from "./jquingo/component/component";
import { jQuingoTextNode } from "./jquingo/component/textnode";

const rootNode = new jQuingoComponent('div', {'class': 'jQuingo'});

const h1Node = new jQuingoComponent('h1', {}, new jQuingoTextNode('Hello World'));
const aNode = new jQuingoComponent('a', {'href': '/'}, new jQuingoTextNode('Click Me!'));
const divNode = new jQuingoComponent('div', {}, aNode);
const containerNode = new jQuingoComponent('div', {'class': 'container'}, h1Node, divNode);
rootNode.children.push(containerNode);

rootNode.render(document.body);