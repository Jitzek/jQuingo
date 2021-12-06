import { jQuingoComponentNode } from "./jquingo/component/component_node";
import { jQuingoTextNode } from "./jquingo/component/text_node";
import { jQuingo } from "./jquingo/jQuingo";

// TODO: refactor to HTML
// Entry point of application?
const rootNode = new jQuingoComponentNode('div', {'class': 'jQuingo'});

const h1Node = new jQuingoComponentNode('h1', {}, new jQuingoTextNode('Hello World'));
const aNode = new jQuingoComponentNode('a', {'href': '/'}, new jQuingoTextNode('Click Me!'));
const divNode = new jQuingoComponentNode('div', {}, aNode);
const containerNode = new jQuingoComponentNode('div', {'class': 'container'}, h1Node, divNode);
const button = document.createElement('button');
button.innerHTML = 'Button';
button.onclick = (_e: MouseEvent) => {
    h1Node.type = 'p'
    h1Node.props.style = 'color: pink';
    // h1Node.remove();
    // divNode.remove();
    containerNode.children.splice(1, 1);
    console.log(containerNode.children[0]);
    // containerNode.children[0] = new jQuingoComponentNode('div', {'style': 'background: blue'}, new jQuingoComponentNode('h1', {'style': 'color: pink'}, new jQuingoTextNode('Hello there')));
    // console.log(containerNode);
};
document.body.append(button);
rootNode.children.push(containerNode);

rootNode.render(document.body);

const jquingo = new jQuingo();
// Start the main render loop
jquingo.renderLoop(rootNode);