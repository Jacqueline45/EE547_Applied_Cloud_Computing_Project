import React from "react";
import { Modal, Form, Input } from "antd";
import {message} from "antd"
const { TextArea } = Input;

const LoginModal = ({ visible, checkEmail, setModalVisible }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Forgot Username/Password"
      okText="Confirm" 
      cancelText="Cancel"
      onCancel={() => {setModalVisible(false);}}
      onOk={() => {
        form.validateFields().then(async (values) => {
          form.resetFields();
          const check = await checkEmail({variables:{email: values.name}})
          switch(check.data.checkUser){
            case 'EMAIL_EXIST':
                message.success({ content:"A link has been sent to your email address. Please verify with your phone number." , duration: 3 });
                break;
            case 'EMAIL_NOT_EXIST':
                message.error({ content:"Email doesn't exist. Please call 1-800-000-0000 for help." , duration: 3 });
                break;
          }
        }).catch((e) => { message.error({ content:"Please enter your email." , duration: 1.5 }) });
    }}>
     <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name" label=""
          rules={[{
            required: true,
            message: "Error: Please enter your email",
          },]}
        >
           <TextArea placeholder="Please type your email that you've registered with this account!" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default LoginModal;
