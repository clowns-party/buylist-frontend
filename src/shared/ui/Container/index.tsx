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
    <div className={`relative py-10 ${className || ""}`} {...ownProps}>
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        {children}
      </div>
    </div>
  );
};

Container.Root = styled.div`
  padding: 0 15px;

  @media (min-width: 575.98px) {
    max-width: 540px;
    margin: auto;
    padding: 0;
  }

  @media (min-width: 767.98px) {
    max-width: 720px;
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
