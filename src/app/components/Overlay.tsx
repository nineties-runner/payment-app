import { motion } from "framer-motion";
import styled from "styled-components";

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

const fetchResult = (): Promise<any> => {
  const result = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      return setTimeout(() => resolve("failure"), 1000);
    }
    setTimeout(() => resolve("success"), 1000);
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
      {result === "success"
        ? `${sum}руб. успешно переведено на счёт 
        ${phoneNumber}.`
        : "Операция не удалась."}
      {children}
    </OverlayBase>
  );
};

export default Overlay;
