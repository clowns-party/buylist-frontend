import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children }: Props) => {
  return <Container.Root>{children}</Container.Root>;
};

Container.Bordered = ({ children, className, ...ownProps }: Props) => {
  return (
    <div className={`relative ${className || ""}`} {...ownProps}>
      <div className="relative px-4 py-10 bg-white shadow rounded-3xl">{children}</div>
    </div>
  );
};

Container.Root = styled.div`
  padding: 0 15px;

  @media (min-width: 575.98px) {
    /* max-width: 540px; */
    margin: auto;
    padding: 0;
  }

  @media (min-width: 767.98px) {
    max-width: 95%;
  }

  @media (min-width: 991.98px) {
    max-width: 960px;
  }

  @media (min-width: 1199.98px) {
    max-width: 1140px;
  }
`;

Container.Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Container;
