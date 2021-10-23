import React, { useState } from "react";
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
    } catch (error: any) {
      const message = error?.message;
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
          name="basic"
          autoComplete="off"
        ></CreateBuylist.Form>
      </CreateBuylist.FormWrap>
      <h2>Add some products</h2>
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
        <button

        // onClick={handleSubmit}
        >
          Submit
        </button>
      </CreateBuylist.Footer>
    </CreateBuylist.Container>
  );
};

CreateBuylist.Container = styled(Container.Root)`
  padding-top: 16px;
`;

CreateBuylist.Form = styled.form``;

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
