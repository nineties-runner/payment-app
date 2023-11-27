"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled, { keyframes } from "styled-components";

import Page from "@/app/components/Page";
import { useHookFormMask } from "use-mask-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeButton from "@/app/components/HomeButton";

type Inputs = {
  cardNumber: string;
  cardDate: string;
  cardCvc: string;
  phoneNumber: string;
  sum: string;
  // provider: string | null;
};

const PayWindow = styled(motion.div)`
  min-height: 100%;
  font-size: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const MessageSpan = styled.span`
  margin: auto;
  font-weight: 600;
  font-size: 1.5em;
`;

const CardInfo = styled.div`
  margin: auto;
  gap: 0.5em;
  width: 40%;
  padding: 1em;
  border-radius: 0.25em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 2px solid #cbd5e1;

  @media (max-width: 1024px) {
    width: 60%;
  }
`;

const PaymentInfo = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1em;

  & > input {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const TextInput = styled.input<{ scalable: number }>`
  position: relative;
  padding: 1em;
  width: calc(50% - 0.6em);
  background-color: #e2e8f0;
  border: none;
  border-radius: 0.25em;
  transition: all 0.1s;
  font-weight: 500;
  text-align: left !important;
  &:focus {
    background-color: #1d4ed8;
    color: white;
    outline: none;
    scale: ${(props) => (props.scalable ? 1.1 : 1.0)};
  }

  &:focus::placeholder {
    color: white;
  }

  &::after {
    content: "s";
    width: 40px;
    height: 40px;
    background-color: red;
  }
`;
TextInput.defaultProps = {
  scalable: 0,
};

const ErrorMsg = styled.span`
  color: #dc2626;
  font-size: 0.7em;
  max-height: 0px;
  margin-top: -1em;
  top: -1em;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  padding: 1em;
  background-color: black;
  outline: none;
  cursor: pointer;
  transition: all 200ms;
  border: none;
  border-radius: 0.25em;
  font-weight: 700;
  font-size: 1em;
  color: white;
  box-shadow: 0px 0px 1em rgba(0, 0, 0, 0.1);
  &:hover {
    scale: 1.03;
    background-color: #22c55e;
  }
  &:active {
    scale: 1;
  }
  &:hover > div {
    border-left: 4px solid #22c55e;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 200ms;
`;

const Checkout = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const query = useSearchParams();
  const provider = query.get("label");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const registerWithMask = useHookFormMask(register);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    router.push(
      `transaction?cardNumber=${data.cardNumber}&cardDate=${data.cardDate}&cardCvc=${data.cardCvc}&phoneNumber=${data.phoneNumber}&sum=${data.sum}`
    );
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PayWindow
          initial={{ translateY: 200, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <MessageSpan>Оплата мобильной связи {provider}</MessageSpan>
          <FlexContainer>
            <CardInfo>
              <TextInput
                placeholder="Номер карты"
                style={{ width: "100%" }}
                scalable={1}
                {...registerWithMask("cardNumber", ["9999 9999 9999 9999"], {
                  required: "Укажите действительные данные карты",
                })}
              />
              <TextInput
                placeholder="ММ/ГГ"
                scalable={1}
                {...registerWithMask("cardDate", "datetime", {
                  required: "Укажите дату",
                  inputFormat: "mm-yy",
                })}
              />
              <TextInput
                placeholder="CVC"
                scalable={1}
                {...registerWithMask("cardCvc", ["999"], {
                  required: "Укажите номер CVC",
                })}
              />
              {(errors.cardNumber || errors.cardDate || errors.cardCvc) && (
                <ErrorMsg
                  style={{ margin: "auto", marginTop: "-0.5em", top: "-0.5em" }}
                >
                  {errors.cardNumber?.message}
                </ErrorMsg>
              )}
            </CardInfo>
            <PaymentInfo>
              <TextInput
                type="text"
                scalable={0}
                placeholder="Номер для пополнения"
                {...registerWithMask("phoneNumber", ["+7 (999) 999 99-99"], {
                  required: "Укажите номер телефона",
                })}
              />
              {errors.phoneNumber?.message && (
                <ErrorMsg>{errors.phoneNumber?.message}</ErrorMsg>
              )}
              <TextInput
                type="text"
                scalable={0}
                placeholder="Сумма платежа"
                {...registerWithMask("sum", "numeric", {
                  max: 1000,
                  min: 0,
                  required: "Укажите сумму, макс. 1000р.",
                })}
              />
              {errors.sum?.message && (
                <ErrorMsg>{errors.sum?.message}</ErrorMsg>
              )}
            </PaymentInfo>
          </FlexContainer>
          <SubmitButton type="submit">
            Оплатить
            {loading && <Spinner />}
          </SubmitButton>
          <HomeButton />
        </PayWindow>
      </form>
    </Page>
  );
};

export default Checkout;
