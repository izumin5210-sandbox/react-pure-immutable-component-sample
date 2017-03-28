import React, { Component } from 'react';
import { is } from 'immutable';

class TodoItem extends Component {

  shouldComponentUpdate(props) {
    return !is(this.props.item, props.item);
  }

  render() {
    const { id, title, completedAt } = this.props.item;
    return (
      <li>[ {(completedAt != null) ? "x" : ""} ] ({ id }) { title }</li>
    );
  }
}

export default class TunedTodoList extends Component {

  shouldComponentUpdate(props) {
    return !is(this.props.todos, props.todos);
  }

  render() {
    const items = this.props.todos.map(item => (
      <TodoItem {...{ item }} key={item.id} />
    ));

    return (
      <ul>
        { items }
      </ul>
    );
  }
}

