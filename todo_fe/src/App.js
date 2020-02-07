import React from 'react';
import moment from 'moment';
import { Table, Drawer, Form, Button, Input, Select, DatePicker, Icon } from 'antd';

import './App.css';

const { Option } = Select;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline'
  },
  {
    title: 'Content',
    dataIndex: 'content'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    filters: [
      {
        text: '全部',
        value: 'all',
      },
      {
        text: '待办',
        value: 'todo',
      },
      {
        text: '完成',
        value: 'done',
      },
      {
        text: '删除',
        value: 'delete',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    filterMultiple: false,
  },
];

const data = [
  {
    key: '1',
    id: 1,
    name: 'John Brown',
    deadline: "2019-12-12",
    content: "fix phone",
    status: '待办',
  },
  {
    key: '2',
    id: 2,
    name: 'Jim Green',
    deadline: "2019-12-12",
    content: "fix phone",
    status: '待办',
  },
  {
    key: '3',
    id: 3,
    name: 'Joe Black',
    deadline: "2019-12-12",
    content: "fix phone",
    status: '完成',
  },
  {
    key: '4',
    id: 4,
    name: 'Jim Red',
    deadline: "2019-12-12",
    content: "fix phone",
    status: '待办',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function disabledDate(current) {
  // Can not select days before today
  return current < moment().endOf('day');
}

class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New account
        </Button>
        <Drawer
          title="Create a new account"
          width={360}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please enter user name' }],
                })(<Input placeholder="Please enter user name" />)}
              </Form.Item>
              <Form.Item label="Owner">
                {getFieldDecorator('owner', {
                  rules: [{ required: true, message: 'Please select an owner' }],
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="DateTime">
                {getFieldDecorator('dateTime', {
                  rules: [{ required: true, message: 'Please choose the dateTime' }],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabledDate={disabledDate}
                  />,
                )}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ],
                })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
              </Form.Item>
          </Form>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const AppDrawer = Form.create()(DrawerForm);

function App() {
  return (
    <div className="App-padding">
      <h2>导航</h2>
      <Button>Show Todo List</Button>

      <p className="space-line"></p>

      <Table columns={columns} dataSource={data} onChange={onChange} />

      <AppDrawer />

    </div>
  );
}

export default App;
