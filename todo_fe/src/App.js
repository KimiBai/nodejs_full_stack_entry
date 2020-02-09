import React from 'react';
import { Button } from 'antd';

import TodoTable from './TodoList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVisiable: false,
      createTodoDone: false,
    }
  }

  showTodoList() {
    this.setState({
      listVisiable: true,
    })
  }

  render() {
    if (this.state.listVisiable) {
      return (
        <div className="App-padding">
          <h2>导航</h2>
          <Button type="link" style={{ padding: 0 }}>显示任务列表</Button>

          <div>
            <div className="space-line">
              <h3>任务列表</h3>
            </div>

            <TodoTable />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App-padding">
        <h2>导航</h2>
        <Button
          onClick={() => this.showTodoList()}
          type="link"
          style={{ padding: 0 }}
        >显示任务列表</Button>
      </div>
      )
    }
  }
}

export default App;
