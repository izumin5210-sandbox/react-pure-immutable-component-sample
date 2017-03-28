import React, { Component } from 'react';
import Perf from 'react-addons-perf'
import { Range, Record } from 'immutable';

import logo from './logo.svg';
import './App.css';

import TodoList from './components/TodoList';
import TunedTodoList from './components/TunedTodoList';
import PureTodoList from './components/PureTodoList';

const Todo = Record({ id: 0, title: '', completedAt: undefined });

const N = 100;
// const N = 10;
const UPDATE_COUNT = 1000;
// const UPDATE_COUNT = 10;

const initialTodos = Range(1, N + 1).map(i => new Todo({
  id: i,
  title: `awesome task ${i}`,
  completedAt: (Math.floor(Math.random() * 2)  === 0) ? new Date() : undefined,
})).toList();
  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCount: 0,
      todosA: initialTodos,
      todosB: initialTodos,
      todosC: initialTodos,
    };
  }

  update(key) {
    const { updateCount } = this.state;
    const todos = this.state[key];
    const i = Math.floor(Math.random() * todos.size);
    const todo = todos.get(i);
    const newTodos = todos.set(i ,todo.set('title', `${todo.title} o`));
    this.setState({ updateCount: updateCount + 1, [key]: newTodos }, () => {
      if (this.state.updateCount < UPDATE_COUNT) {
        this.update(key);
      } else {
        console.timeEnd(key)
        Perf.stop();
        Perf.printWasted();
        this.setState({ updateCount: 0 });
      }
    });
  }

  handleClickA = () => {
    this.handleClick('todosA');
  };

  handleClickB = () => {
    this.handleClick('todosB');
  };

  handleClickC = () => {
    this.handleClick('todosC');
  };

  handleClick(key) {
    Perf.start();
    console.time(key)
    this.update(key);
  }

  render() {
    const { todosA, todosB, todosC } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <section>
          <h2>Normal component</h2>
          <button onClick={this.handleClickA}>Start</button>
          <TodoList todos={todosA} />
        </section>
        <section>
          <h2>Overriding shouldComponentUpdate component</h2>
          <button onClick={this.handleClickB}>Start</button>
          <TunedTodoList todos={todosB} />
        </section>
        <section>
          <h2>Pure component</h2>
          <button onClick={this.handleClickC}>Start</button>
          <PureTodoList todos={todosC} />
        </section>
      </div>
    );
  }
}

export default App;
