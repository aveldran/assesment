'use-strict';

const e = React.createElement;

const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0,
      uncheckedCount: 0,
      todos: []
    };
    this.newTodo = this.newTodo.bind(this);
    this.updateItemCount = this.updateItemCount.bind(this);
    this.updateUncheckedCount = this.updateUncheckedCount.bind(this);
  }
  updateItemCount() {
    this.setState({
      itemCount: this.state.itemCount + 1
    });
  }
  updateUncheckedCount() {
    var boxes = document.querySelectorAll('.todo-checkbox');
    var noChecks = 0;

    // Its a NodeList
    Array.prototype.forEach.call(boxes, function (checkbox) {
      console.log('iterating boxes: ', checkbox.checked);
      if (!checkbox.checked) {
        noChecks += 1;
      }
    });

    this.setState({
      uncheckedCount: noChecks
    });
  }
  newTodo() {

    var text = prompt("Add a Todo item: ");
    var checkBox = e('input', {key: 0, className: classNames.TODO_CHECKBOX, type: 'checkbox', name: text, value: text, onClick: this.updateUncheckedCount});
    var todoText = e('span', {key:1, className: classNames.TODO_TEXT}, [checkBox, text]);
    var todos = this.state.todos.slice();
    var todo = e('li', {key: todos.length + 1, className: classNames.TODO_ITEM}, [todoText]);
    
    todos.push(todo);

    this.setState({
      todos: todos
    });

    this.updateItemCount();
    // Wait for DOM to be re-rendered
    setTimeout(this.updateUncheckedCount,0);
  }
  render() {
    const title = e('h1', {key: 1, className: 'center title'}, 'My Todo App');
    const itemCountValue = e('span', {key: 1, className: 'item-count'}, this.state.itemCount);
    const uncheckedCountValue = e('span', {key: 1, className: 'unchecked-count'}, this.state.uncheckedCount);
    const itemCount = e('span', {key: 1}, 'Item count: ', [itemCountValue]);
    const uncheckedCount = e('span', {key: 2}, 'Unchecked count: ', [uncheckedCountValue]);
    const controls = e('div', {key: 2, className: 'flow-right controls'}, [itemCount, uncheckedCount]);
    const button = e('button', {key:3, className: 'button center', onClick: this.newTodo}, 'New Todo');
    const list = e('ul', {key:4, className: 'todo-list', id: 'todo-list'}, this.state.todos);

    return e('div',{className: 'container center'}, [title, controls, button, list]);
  }
}

const domContainer = document.querySelector('.app');
ReactDOM.render(e(Todo), domContainer);
