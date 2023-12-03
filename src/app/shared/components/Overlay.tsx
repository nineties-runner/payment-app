import { error } from "console";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

type OverlayProps = {
  phoneNumber: string | null;
  sum: string | null;
  children: React.ReactNode;
};

const OverlayBase = styled(motion.div)<{ result: string }>`
  padding: 1em;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  font-size: 1em;
  color: white;
  gap: 1em;
  background-color: ${(props) =>
    props.result === "success" ? "#22c55e" : "#dc2626"};
`;

const resultSuccessPopup = keyframes`
  0% {
    clip-path: polygon(1% 53%, 37% 98%, 1% 53%, 38% 73%);
  }
  50% {
    clip-path: polygon(1% 53%, 37% 98%, 36% 98%, 38% 73%);
  }
  100% {
    clip-path: polygon(1% 53%, 37% 98%, 99% 27%, 38% 73%);
  }
`;

const resultFailurePopup = keyframes`
0% {
  clip-path: polygon(0 20%, 0% 20%, 50% 50%, 20% 100%, 20% 100%, 50% 50%, 100% 80%, 100% 80%, 50% 50%, 80% 0, 80% 0%, 50% 50%);
}
100% {
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}
`;

const ResultIcon = styled.div<{ result: string }>`
  height: 10em;
  width: 10em;
  background-color: white;
  transition: all 1s;

  animation: ${(props) =>
      props.result === "success" ? resultSuccessPopup : resultFailurePopup}
    0.4s ease-in-out forwards;
`;

const fetchResult = (): Promise<any> => {
  const result = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      return setTimeout(() => reject("failure"), 1000);
    }
    setTimeout(() => resolve("success"), 1000);
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const Overlay = async ({ phoneNumber, sum, children }: OverlayProps) => {
  const result = await fetchResult();
  return (
    <OverlayBase
      result={result}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ResultIcon result={result} />
      {result === "success" ? (
        <div>
          {sum}
          <br />
          успешно переведено на счёт
          <br />
          {phoneNumber}.
        </div>
      ) : (
        <div>Операция не удалась.</div>
      )}
      {children}
    </OverlayBase>
  );
};

export default Overlay;
