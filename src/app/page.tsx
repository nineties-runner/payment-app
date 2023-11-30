"use client";
import Link from "next/link";
import Page from "./components/Page";
import styled from "styled-components";
import { motion } from "framer-motion";

const Intro = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #1d4ed8;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: 800;
  color: white;
  top: 0;
  left: 0;
`;

const IntroTextWrapper = styled(motion.span)`
  padding: 0.25em;
`;

const IntroSmallText = styled(motion.span)`
  font-size: 0.25em;
  opacity: 0.8;
`;

const MessageSpan = styled.span`
  text-align: center;
  font-size: 0.7em;
  padding: 0.5em;
  margin-top: -0.5em;
`;

const ProviderOption = styled.div`
  width: 100%;
  height: 2em;
  display: flex;
  align-items: center;
  border: none;
  transition: all 200ms;
  padding: 0.5em;
  &:hover {
    border-left: 0.5em solid #1d4ed8;
    background-color: #bfdbfe;
    color: #1d4ed8;
  }

  &:hover:after {
    content: "➔";
    position: absolute;
    opacity: 0.8;
    right: 2em;
  }
`;

const ProviderList = styled.div`
  display: flex;
  flex-direction: column;
`;

const providers = [
  {
    label: "Megafon",
    url: "megafon",
  },
  {
    label: "MTC",
    url: "mtc",
  },
  {
    label: "Beeline",
    url: "beeline",
  },
];

const Home = () => {
  return (
    <Page>
      <Intro
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, pointerEvents: "none", y: "-100%" }}
        transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
      >
        <IntroTextWrapper
          initial={{ backgroundColor: "#1d4ed8", color: "#ffffff" }}
          animate={{ backgroundColor: "#ffffff", color: "#1d4ed8" }}
          transition={{ delay: 0.5, duration: 0.2 }}
        >
          {"￠PAY APP".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </IntroTextWrapper>
        <IntroSmallText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          2020 — 2023
        </IntroSmallText>
      </Intro>
      <ProviderList>
        <MessageSpan>Выберите оператора</MessageSpan>
        {providers.map((item, i) => {
          return (
            <Link
              key={i}
              href={{
                pathname: "checkout/" + item.url,
                query: { label: item.label },
              }}
            >
              <ProviderOption>{item.label}</ProviderOption>
            </Link>
          );
        })}
      </ProviderList>
    </Page>
  );
};

export default Home;
