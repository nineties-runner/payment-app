import { useRouter } from "next/navigation";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  padding: 1em;
  background-color: #d1d5db;
  outline: none;
  cursor: pointer;
  transition: all 200ms;
  border: none;
  border-radius: 0.25em;
  font-weight: 700;
  font-size: 1rem;
  color: black;

  box-shadow: 0px 0px 1em rgba(0, 0, 0, 0.1);
  &:hover {
    scale: 1.03;
    background-color: #1d4ed8;
  }
  &:active {
    scale: 1;
  }
  &:hover > div {
    border-left: 4px solid #22c55e;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const HomeButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/");
      }}
    >
      Главное меню
    </Button>
  );
};

export default HomeButton;
