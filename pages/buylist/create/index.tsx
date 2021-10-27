import { CreateBuylist } from "features/buylist/ui";
import React, { useState } from "react";
import { Container } from "shared/ui";
import styled from "styled-components";
import { useAuthGuard } from "../../../src/features/auth/lib/hooks/useAuth";
import { useCreateBuylistMutation } from "../../../src/features/buylist/mutations/createBuylist.mutation.generated";
import {
  CreateBuylistInput,
  Statuses,
} from "../../../src/types/types.generated";

const CreatePage = () => {
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
    <CreatePage.Container>
      <CreateBuylist />

      <h2>Add some products</h2>

      {productsSorted?.map((product) => (
        <div key={product.id}>
          <h2>product {product.id}</h2>
          <p onClick={() => onRemoveProduct(product.id)}>remove</p>
        </div>
      ))}
    </CreatePage.Container>
  );
};

CreatePage.Container = styled(Container.Root)`
  padding-top: 16px;
`;

export default CreatePage;
