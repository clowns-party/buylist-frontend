import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";
import Container from "../../src/Elements/Container";
import {
  useAuth,
  useAuthRedirect,
} from "../../src/features/auth/hooks/useAuth";
import { useLoginMutation } from "../../src/features/auth/mutations/signin/sigin.mutation.generated";

const SignIn = () => {
  useAuthRedirect();
  const [form] = Form.useForm();
  const [login, { loading }] = useLoginMutation();
  const { syncLogin, loading: userLoading } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const loginData = await login({
        variables: {
          email,
          password,
        },
      });
      const access = loginData?.data?.login || "";
      syncLogin(access);
    } catch (error: any) {
      const message = error?.message;

      form.setFields([
        {
          name: "email",
          errors: [message],
        },
        {
          name: "password",
          errors: [""],
        },
      ]);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const dataLoad = userLoading || loading;

  return (
    <SignIn.Container>
      <SignIn.Form>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={dataLoad}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </SignIn.Form>
    </SignIn.Container>
  );
};

SignIn.Container = styled(Container.Center)`
  padding-top: 20px;
  flex-direction: column;
`;

SignIn.Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #1890ff;
  border-radius: 12px;
`;

export default SignIn;
