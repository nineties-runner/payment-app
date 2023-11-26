"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Body = styled.div`
  width: 100%;
  height: 60px;
  background-color: #1d4ed8;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const Logo = styled.span`
  font-size: 1em;
  font-weight: 800;
`;

const BackButton = styled.span`
  vertical-align: middle;
  font-size: 0.5em;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Header = () => {
  const path = usePathname();

  return (
    <Body>
      <Logo>￠PAY APP</Logo>
      {path !== "/" && (
        <Link href={"/"}>
          <BackButton>← Главное меню</BackButton>
        </Link>
      )}
    </Body>
  );
};

export default Header;
