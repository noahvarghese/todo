import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/AddListItem.css';

class AddListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: '',
        };
    }

    handleSubmit () {
        let regex = new RegExp(/\w/);
        let value = ReactDOM.findDOMNode(this).getElementsByTagName("input")[0].value;
        console.log(regex.test(value));
        if (regex.test(value)) {

            this.props.addTodo(value);
            this.setState({todo: ''});
        }
    }

    handleChange (e) {
        this.setState({todo: e.target.value});

        if (e.key === "Enter") {
            this.handleSubmit();
        }
    }

    componentDidMount () {

        ReactDOM.findDOMNode(this).getElementsByTagName("input")[0].focus();
    }

    render() {
        return (
            <div className="AddListItem">
                <div className="newTodo">
                    <input type="text" placeholder="Add new item..." value={this.state.todo} onChange={e => this.handleChange(e)} onKeyPress={e => this.handleChange(e)}/>
                    <button type="submit" className="add button" value="Add" onClick={e => this.handleSubmit(e)}>Add</button>
                </div>
            </div>
        );
    }
}

export default AddListItem;