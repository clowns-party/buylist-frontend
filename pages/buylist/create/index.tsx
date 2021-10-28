import { ProcessBuylistCreate } from "features/create-buylist/ui";
import React, { useState } from "react";
import { Container } from "shared/ui";
import styled from "styled-components";
import { useAuthGuard } from "../../../src/features/auth/lib/hooks/useAuth";

const CreatePage = () => {
  useAuthGuard();

  // const [products, setProducts] = useState<any[]>([{ id: 1 }]);

  // const productsSorted = products?.sort((a, b) => b.id - a.id);

  return (
    <CreatePage.Container>
      <ProcessBuylistCreate />

      {/* <h2>Add some products</h2>

      {productsSorted?.map((product) => (
        <div key={product.id}>
          <h2>product {product.id}</h2>
        </div>
      ))} */}
    </CreatePage.Container>
  );
};

CreatePage.Container = styled(Container.Root)`
  padding-top: 16px;
`;

export default CreatePage;
