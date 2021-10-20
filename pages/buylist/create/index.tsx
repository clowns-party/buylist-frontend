import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
} from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import TreeSelect from "rc-tree-select";
import React from "react";
import Container from "../../../src/Elements/Container";
import { useAuthGuard } from "../../../src/features/auth/hooks/useAuth";
import { useCreateBuylistMutation } from "../../../src/features/buylist/mutations/createBuylist.mutation.generated";
import {
  CreateBuylistInput,
  Statuses,
} from "../../../src/types/types.generated";

const CreateBuylist = () => {
  useAuthGuard();
  const [create, { data, loading }] = useCreateBuylistMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    const { name, description } = values;
    const input: CreateBuylistInput = {
      name,
      description: description || "",
      status: Statuses.Created,
      totalPrice: 0,
    };
    try {
      const createdBuylist = await create({
        variables: { input },
      });
      message.info("Buylist was created!");
      form.resetFields();
    } catch (error: any) {
      const message = error?.message;
      form.setFields([
        {
          name: "name",
          errors: [message],
        },
        {
          name: "description",
          errors: [""],
        },
      ]);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <h2>Create your buylist</h2>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default CreateBuylist;
