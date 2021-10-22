import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Typography } from "antd";
import Text from "antd/lib/typography/Text";
import { useState } from "react";
import React from "react";
import styled from "styled-components";
import Container from "../../../src/Elements/Container";
import { useAuthGuard } from "../../../src/features/auth/lib/hooks/useAuth";
import { useCreateBuylistMutation } from "../../../src/features/buylist/mutations/createBuylist.mutation.generated";
import {
  CreateBuylistInput,
  Statuses,
} from "../../../src/types/types.generated";

const CreateBuylist = () => {
  const [products, setProducts] = useState<any[]>([{ id: 1 }]);

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

  const onAddProduct = () => {
    const last = products[0]?.id || 0;

    setProducts([...products, { id: last + 1 }]);
  };

  const onRemoveProduct = (id: number) => {
    const removed = products.filter((product) => product.id !== id);
    setProducts(removed);
  };

  const productsSorted = products?.sort((a, b) => b.id - a.id);

  return (
    <CreateBuylist.Container>
      <h2>Create buylist</h2>

      <CreateBuylist.Description>
        Create your buylist that you want to schedule alone or together.
      </CreateBuylist.Description>
      <CreateBuylist.FormWrap>
        <CreateBuylist.Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
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
        </CreateBuylist.Form>
      </CreateBuylist.FormWrap>
      <h2>Add some products</h2>
      <PlusCircleOutlined onClick={onAddProduct} />
      {productsSorted?.map((product) => (
        <CreateBuylist.FormWrap key={product.id}>
          <h2>product {product.id}</h2>
          <p onClick={() => onRemoveProduct(product.id)}>remove</p>
        </CreateBuylist.FormWrap>
      ))}

      <CreateBuylist.FormWrap>
        <h2>Invite someone</h2>
      </CreateBuylist.FormWrap>

      <CreateBuylist.Footer>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          // onClick={handleSubmit}
        >
          Submit
        </Button>
      </CreateBuylist.Footer>
    </CreateBuylist.Container>
  );
};

CreateBuylist.Container = styled(Container.Root)`
  padding-top: 16px;
`;

CreateBuylist.Form = styled(Form)`
  .ant-row.ant-form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .ant-col.ant-form-item-label {
    label {
      font-weight: 500;
    }
  }
`;

CreateBuylist.Footer = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
`;
CreateBuylist.Description = styled.p`
  color: #918d8c;
  width: 215px;
`;
CreateBuylist.FormWrap = styled.div`
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 1em;
`;

export default CreateBuylist;
