import React from 'react';
import moment from 'moment';
import { Table, Button, Drawer, Form, Input, DatePicker} from 'antd';

import http from './server';
import CreateTodoDrawer from './CreateTodo';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().startOf('day');
}

class EditTodoDrawerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            todoItem:{},
        };
    }

    async saveTodo(todo) {
      //console.log("save todo param", todo)

      const res = await http.post('/update', {
        id: todo.id,
        name: todo.name,
        deadline: todo.dateTime.format("YYYY-MM-DD"),
        content: todo.content,
      })

      if (res) {
        console.log(this.props);
        this.props.handleEdit(res.data.todo);
      }
    }

    handleSubmit (e) {
        e.preventDefault();
        console.log("handle submit");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Receive values of form", values);
                this.saveTodo(values);
            }
        });

        console.log("handle submit 11111");

        this.setState({
            visible: false,
        });
    }
  
    showDrawer = () => {
      this.setState({
        visible: true,
      });
      this.props.form.resetFields();
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    onReset = () => {
      console.log("Reset button clicked");
      this.props.form.resetFields();
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;

      return (
        <div>        
          <Button
            onClick={this.showDrawer}
            size={'small'} 
            style={{ marginRight: 5, float: 'left' }}
          >编辑</Button>
  
          <Drawer
            title="任务详情"
            width={360}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Form layout="vertical" hideRequiredMark onSubmit={e => this.handleSubmit(e)}>
                <Form.Item style={{ display: 'none' }}>
                  {getFieldDecorator('id', {
                    initialValue: this.props.todoItem.id,
                  })(<Input disabled />)}
                </Form.Item>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    initialValue: this.props.todoItem.name,
                    rules: [{ required: true, message: 'Please enter name' }],
                  })(<Input
                    placeholder= "Please enter name"
                  />)}
                </Form.Item>
                <Form.Item label="DateTime">
                  {getFieldDecorator('dateTime', {
                    initialValue: moment(this.props.todoItem.deadline),
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                      disabledDate={disabledDate}
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Content">
                  {getFieldDecorator('content', {
                    initialValue: this.props.todoItem.content,
                    rules: [
                      {
                        required: true,
                        message: 'please enter content',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="please enter content" />)}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" style={{ marginRight: 35 }} type="primary">
                        保存
                    </Button>
                    <Button onClick={this.onReset} style={{ marginRight: 35 }}>
                        重置
                    </Button>
                    <Button onClick={this.onClose} style={{ color: '#ff0000' }}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
          </Drawer>
        </div>
      );
    }
  }

const EditTodoDrawer = Form.create({})(EditTodoDrawerForm);

async function getTodoList(status, page, limit, callback) {
  let url = '/list?status=' + status + '&page=' + page + '&limit=' + limit;
  const res = await http.get(url, {})
  //console.log(res);

  res.data.list.rows.map((val, idx) => {
    val['key'] = idx

    return val;
  })

  callback(res.data);
}

class TodoTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
              title: 'ID',
              dataIndex: 'id'
            },
            {
              title: '名称',
              dataIndex: 'name',
              className: 'table-name-col-width'
            },
            {
              title: '截止日期',
              dataIndex: 'deadline',
              defaultSortOrder: 'descend',
              sorter: (a, b) => moment(a.deadline).dayOfYear() - moment(b.deadline).dayOfYear(),
              render:(text, record, index) => {
                return (<div>{moment(record.deadline).format("YYYY-MM-DD")}</div>)
              }
            },
            {
              title: '内容',
              dataIndex: 'content',
              className: 'table-content-col-width'
            },
            {
              title: '状态',
              dataIndex: 'status',
              render:(text, record, index) => {
                //console.log("status record", text, record, index);
                // 1-待办 2-完成 3-删除 -1-全部

                switch(this.state.dataSource[index].status - 0) {
                  case 1:
                    return ( <div>{(this.state.dataSource[index].status - 0) === 1 ? '待办' : ''}</div> );
                  case 2:
                    return ( <div>{(this.state.dataSource[index].status - 0) === 2 ? '完成' : ''}</div> );
                  case 3:
                    return ( <div>{(this.state.dataSource[index].status - 0) === 3 ? '删除' : ''}</div> );
                  default:
                    return null;
                }                
              },
            },
            {
              title: '操作',
              dataIndex: 'operate',
              render:(text, record, index) => {
                switch(record.status - 0) {
                  case 1: // 完成
                    return (
                      <div>
                        <EditTodoDrawer todoItem={record} handleEdit={this.handleEdit.bind(this)}/>
                        <Button onClick={ e => this.update2CompleteStatus(e) } data-id={record.id} size={'small'} style={{ marginRight: 5 }}>完成</Button>
                        <Button onClick={ e => this.update2DeleteStatus(e) } data-id={record.id} size={'small'} style={{ color: '#ff0000' }}>删除</Button>
                      </div>
                    );
                  case 2: // 完成
                    return (
                      <div>
                        <EditTodoDrawer todoItem={record} handleEdit={this.handleEdit.bind(this)}/>
                        <Button onClick={ e => this.update2TodoStatus(e) } data-id={record.id} size={'small'} style={{ marginRight: 5 }}>待办</Button>
                        <Button onClick={ e => this.update2DeleteStatus(e) } data-id={record.id} size={'small'} style={{ color: '#ff0000' }}>删除</Button>
                      </div>
                    );
                  case 3:// 删除
                    return (
                      <div>
                        <Button onClick={ e => this.deleteTodoById(e) } data-id={record.id} size={'small'} style={{ color: '#ff0000' }}>清除</Button>
                      </div>
                    );
                  default:
                    return null;
                }
                
              },
              filters: [
                {
                  text: '全部',
                  value: -1, // -1
                },
                {
                  text: '待办',
                  value: 1, // 1
                },
                {
                  text: '完成',
                  value: 2, // 2
                },
                {
                  text: '删除',
                  value: 3, // 3
                },
              ],
              filterMultiple: false,
            },
          ];
        this.state = {
            dataSource: [],
            dataTotal: 1,
            queryInfo: {
                pageSize: 25,
                currentPage: 1,
                currentStatus: -1,
            },
        }
    }

    componentDidMount() {
      //console.log("componentDidMount");
      getTodoList(this.state.queryInfo.currentStatus,
        this.state.queryInfo.currentPage,
        this.state.queryInfo.pageSize,
        (data) => {
          this.setState({
            dataSource: data.list.rows,
            dataTotal: data.list.count,
          })
        })
    }

    async update2TodoStatus(e) {
      let id = e.target.dataset.id - 0;

      const res = await http.post('/update_status', {
        id: id,
        status: 1
      })

      if (res) {
        let todo = res.data.todo;
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => todo.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...todo
        })
  
        this.setState({ dataSource: newData })
      }
    }
    
    async update2CompleteStatus(e) {
      let id = e.target.dataset.id - 0;

      const res = await http.post('/update_status', {
        id: id,
        status: 2
      })

      if (res) {
        let todo = res.data.todo;
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => todo.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...todo
        })

        this.setState({ dataSource: newData })
      }
    }

    async update2DeleteStatus(e) {
      let id = e.target.dataset.id - 0;

      const res = await http.post('/update_status', {
        id: id,
        status: 3
      })

      if (res) {
        let todo = res.data.todo;
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => todo.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...todo
        })

        this.setState({ dataSource: newData })
      }
    }

    handleEdit = record => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => record.id === item.id);
        const item = newData[index];
        record['key'] = index;
        newData.splice(index, 1, {
            ...item,
            ...record,
        });
        this.setState({ dataSource: newData });

        console.log("handle edit record" + JSON.stringify(record));
    }

    pageChange(changePage) {
      getTodoList(
        this.state.queryInfo.currentStatus,
        changePage,
        this.state.queryInfo.pageSize,
        (data) => {
          this.setState({
            dataSource: data.list.rows,
            dataTotal: data.list.count,
          })
        });

      let queryInfo = this.state.queryInfo;
      queryInfo.currentPage = changePage;
      this.setState({
        queryInfo: queryInfo,
      })
    }

    async deleteTodoById(e) {
      let id = e.target.dataset.id - 0;

      const res = await http.post('/delete', {
        id: id
      })

      if (res) {
        this.pageChange(this.state.queryInfo.currentPage);
      }
    }

    handleTableChange = (pagination, filters, sorter) => {
      //console.log("handle table change ", pagination, filters, sorter);
      let status = filters.operate ? filters.operate[0] : this.state.queryInfo.currentStatus;
      status = status ? status : -1;

      getTodoList(
        status,
        pagination.current,
        this.state.queryInfo.pageSize,
        (data) => {
          this.setState({
            dataSource: data.list.rows,
            dataTotal: data.list.count,
          })
        });

      let queryInfo = this.state.queryInfo;
      queryInfo.currentPage = pagination.current;
      queryInfo.currentStatus = status;
      this.setState({
        queryInfo: queryInfo,
      })
    }

    createTodoHandle(flag) {
      if (flag) {
        getTodoList(
          this.state.queryInfo.currentStatus,
          this.state.queryInfo.currentPage,
          this.state.queryInfo.pageSize,
          (data) => {
            this.setState({
              dataSource: data.list.rows,
              dataTotal: data.list.count,
            })
          });
      }
    }

    render() {
        return (
          <div>
            <CreateTodoDrawer createTodoHandle={(flag) => {this.createTodoHandle(flag)}} />

            <Table
              columns={this.columns}
              rowClassName={(record, index) => {
                let diff = moment(record.deadline).dayOfYear() - moment().dayOfYear();
                switch (diff) {
                case 1:
                  return 'urgent-bg-color';
                case 2:
                  return 'not-so-urgent-bg-color';
                default:
                  return 'normal-bg-color';
                }
              }}
              dataSource={this.state.dataSource}
              locale={locale}
              pagination={{
                  pageSize: this.state.queryInfo.pageSize,
                  total: this.state.dataTotal,
              }}
              onChange={this.handleTableChange}
            />
          </div>
        );
    };
}

const locale = {
    filterConfirm: '确认',
    filterReset: '重置',
    filterClose: '取消',
};

export default TodoTable;