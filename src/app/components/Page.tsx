"use client";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  margin: auto;
  width: 768px;
  min-height: 100vh;
  background-color: #f8fafc;
  font-size: 2em;
  position: relative;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Content = styled.div<{ padding?: string | number }>`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  padding: ${(props) => props.padding};
`;
Content.defaultProps = {
  padding: "1em",
};

export const Page = ({
  children,
  padding,
}: {
  children?: React.ReactNode;
  padding?: string | number;
}) => {
  return (
    <>
      <Container>
        <Header />
        <Content padding={padding}>{children}</Content>
      </Container>
    </>
  );
};

export default Page;
