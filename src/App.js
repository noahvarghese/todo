import React, { Component } from 'react';
import AddListItem from './AddListItem';
import TodoItem from './TodoItem';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo (todo) {
      this.setState({
        todos: [...this.state.todos, {todo: todo, completed: false}]
      });
  }

  deleteTodo (e) {
    e.stopPropagation();
    let index = e.target.parentNode.parentNode.parentNode.getAttribute("datakey");
    let temp = this.state.todos;
    temp.splice(index, 1);
    this.setState({
      todos: temp
    });
  }

  editTodo (todo, index) {

    let temp = this.state.todos;
    temp[index].todo = todo;

    this.setState({
      todos: temp,
    });
  }

  setCompleted (completed, index) {
    let changeTodo = {todo: this.state.todos[index].todo, completed: completed};
    let temp = [];
    for (let i = 0; i < this.state.todos.length; i++) {
      if (i !== index) {
        temp[i] = this.state.todos[i];
      } else {
        temp[i] = changeTodo;
      }
    }
    this.setState({
      todos: temp
    });
  }

  makeKey (item, index) {
    return item.todo.toString() + index + Date.now();
  }

  render() {
    return (
      <div className="App">
        <h1>To Do</h1>
        <AddListItem addTodo={this.addTodo.bind(this)}/>
        <div className="ListContainer">
          <ul>
            {
              this.state.todos.map( (item, index) => {
                return(
                  <TodoItem key={this.makeKey(item, index)} datakey={index} value={item.todo.toString()} completed={item.completed} deleteTodo={e => this.deleteTodo(e)} editTodo={(todo, index) => this.editTodo(todo, index)} setCompleted={(completed, index) => this.setCompleted(completed, index)}/>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
