import { ProcessBuylistCreate } from "features/create-buylist/ui";
import React, { useState } from "react";
import { Container } from "shared/ui";
import styled from "styled-components";
import { useAuthGuard } from "../../../src/features/auth/lib/hooks/useAuth";

const CreatePage = () => {
  useAuthGuard();

  return (
    <CreatePage.Container>
      <ProcessBuylistCreate />
    </CreatePage.Container>
  );
};

CreatePage.Container = styled(Container.Root)`
  padding-top: 16px;
`;

export default CreatePage;
