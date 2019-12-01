import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/TodoItem.css';

class TodoItem extends Component {

  constructor (props) {
    super(props);
    this.state = {
      todo: this.props.value,
      editedValue: '',
      completed: this.props.completed
    };
  }

  componentDidMount () {
    if (this.state.completed) {
      ReactDOM.findDOMNode(this).getElementsByTagName("input")[0].checked = true;
      ReactDOM.findDOMNode(this).getElementsByTagName("li")[0].style.textDecoration = "line-through";
    }
  }

  changeDisplay () {

    let display = ReactDOM.findDOMNode(this).getElementsByClassName("displayTodo")[0];
    let edit = ReactDOM.findDOMNode(this).getElementsByClassName("editTodo")[0];
    
    if (edit.style.display !== "block") {
      this.setState({
        editedValue: this.state.todo
      });
      display.style.display = "none";
      edit.style.display = "block";
      edit.getElementsByTagName("input")[0].focus();
    } else {
      this.setState({
        todo: this.state.editedValue
      });
      display.style.display = "block";
      edit.style.display = "none";
    }
  }

  editTodo () {
    this.changeDisplay();
  }
  
  setCompleted (e) { 
    if (this.state.completed) {
      this.setState({completed: false});
      this.props.setCompleted(false, this.props.datakey);  
      e.target.parentElement.parentElement.style.textDecoration = "none";
    } else {
      this.setState({completed: true}); 
      e.target.parentElement.parentElement.style.textDecoration = "line-through";
      this.props.setCompleted(true, this.props.datakey);  
    }
  }

  submitEdit () {
    this.props.editTodo(this.state.todo,this.props.datakey);
  }

  handleChange (e) {
    this.setState({todo: e.target.value});

    if (e.key === "Enter") {
      this.props.editTodo(e.target.value, parseInt(this.props.datakey));
    }
}

  render() {
    return (
      <div className="TodoItem" datakey={this.props.datakey}>
        <li>
          <div className="displayTodo">
            <label className="container">
              <input className="complete" type="checkbox" value="complete"></input>
              <span className="checkmark" onClick={ e => this.setCompleted(e)}></span>
            </label>
            {this.state.todo}
            <button className="edit button" value="edit" onClick={() => this.editTodo()}><i className="fas fa-pencil-alt"></i></button>
            <button className="delete button" value="delete" onClick={e => this.props.deleteTodo(e)}><i className="fas fa-trash-alt"></i></button>
          </div>
          <div className="editTodo">
            <input className="edit" type="text" value={this.state.todo} onChange={e => this.handleChange(e)} onKeyPress={e => this.handleChange(e)} />
            <button className="check button" value="check" onClick={e => this.submitEdit(e)}><i className="fas fa-check"></i></button>
            <button className="cancel button" value="cancel" onClick={() => this.changeDisplay()}><i className="fas fa-times"></i></button>
          </div>
        </li>
      </div>
    );
  }
}

export default TodoItem;