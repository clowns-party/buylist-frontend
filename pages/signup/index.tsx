import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import styled from "styled-components";
import { useRegisterMutation } from "../../src/features/auth/mutations/signup/signup.mutation.generated";
import { AuthRegisterInput } from "../../src/types/types.generated";
import { useRouter } from "next/router";
import Container from "../../src/Elements/Container";
import { useAuthRedirect } from '../../src/features/auth/hooks/useAuth';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  prefix: string;
}

const SignUp = () => {
  useAuthRedirect();

  const router = useRouter();
  const [form] = Form.useForm();
  const [register, { loading }] = useRegisterMutation();

  const onFinish = async (values: FormValues) => {
    const input: AuthRegisterInput = {
      email: values?.email,
      firstName: values?.first_name,
      lastName: values?.last_name,
      password: values?.password,
      phone: `${values?.prefix}${values?.phone}`,
    };

    try {
      await register({
        variables: { input },
      });
      router.push("/signin");
    } catch (error: any) {
      const message = error?.message;

      form.setFields([
        {
          name: "email",
          errors: [message],
        },
      ]);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <SignUp.Container>
      <SignUp.RegistrForm>
        <SignUp.Title>Registration</SignUp.Title>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          labelAlign="left"
          onFinish={onFinish}
          initialValues={{
            prefix: "+7",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="first_name"
            label="Firstname"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Lastname"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "The password must be at least 5 characters",
                min: 5,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </SignUp.RegistrForm>
    </SignUp.Container>
  );
};

SignUp.Container = styled(Container.Center)`
  padding-top: 20px;
`;
SignUp.RegistrForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #1890ff;
  border-radius: 12px;
`;
SignUp.Title = styled.h1``;

export default SignUp;
