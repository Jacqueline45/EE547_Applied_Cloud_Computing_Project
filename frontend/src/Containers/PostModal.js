import React from "react";
import { Modal, Form, Input } from "antd";
import {message} from "antd"
const { TextArea } = Input;

const PostModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const onChange = e => { console.log(e);};
  return (
    <Modal
      visible={visible}
      title="Positive Thing!"
      okText="Create" 
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
          console.log(values.name)
        }).catch((e) => { message.error({ content:"Please enter text." , duration: 1.5 }) });
    }}>
     <Form form={form} layout="vertical" 
        name="form_in_modal">
        <Form.Item
          name="name" label=""
          rules={[{
            required: true,
            message: "Error: Please enter text!",
          },]}
        >
           <TextArea placeholder="Happy day" allowClear onChange={onChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default PostModal;
