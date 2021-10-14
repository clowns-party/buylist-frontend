import { Form, Input, Button, Checkbox } from "antd";
import { useCookie } from "react-use";
import { AUTH_TOKEN } from "../../apollo/client";
import { useAuth } from "../../src/features/auth/AuthContext";
import { useLoginMutation } from "../../src/features/auth/sigin.mutation.generated";

const SignUp = () => {
  const [_, setToken] = useCookie(AUTH_TOKEN);
  const [login, { loading, error }] = useLoginMutation();
  const { user, setApolloClient } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    const loginData = await login({
      variables: {
        email,
        password,
      },
    });
    const access = loginData?.data?.login;
    setApolloClient(access || "");
    setToken(access || "");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2>{user?.email}</h2>
      <Form
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
