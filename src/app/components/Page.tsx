"use client";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyle = createGlobalStyle`
  *,
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    max-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background-color: #cbd5e1;
  }
`;

const Container = styled.div`
  margin: auto;
  width: 768px;
  min-height: 100vh;
  background-color: #f8fafc;
  font-size: 2em;
  position: relative;
  overflow: hidden;
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
    <main>
      <GlobalStyle />
      <Container>
        <Header />
        <Content padding={padding}>{children}</Content>
      </Container>
    </main>
  );
};

export default Page;
