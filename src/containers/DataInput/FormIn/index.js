import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import './index.less';

const { Item } = Form;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function hasErrors(fieldsError) {
  console.log(fieldsError);
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class RegisterForm extends Component {
  componentDidMount() {
    console.log(this.props.form);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Some error when submit:', err);
      if (!err) {
        console.log('Values to be submit: ', values);
      }
    });
    console.log(e);
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return <Form layout="inline" onSubmit={this.handleSubmit}>
      <Item
        validateStatus={userNameError ? 'error' : ''}
        help={userNameError || ''}
      >
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入用户名！' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} placeholder="请输入用户名" />} />
        )}
      </Item>
      <Item
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
      >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入邮箱！' }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />} type="password" />
        )}
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Log in</Button>
      </Item>
    </Form>;
  }
}

const formOption = {
  name: 'Register_form',
  
};

const FormIn = Form.create(formOption)(RegisterForm);

export default FormIn;