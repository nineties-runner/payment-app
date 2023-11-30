"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
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
    scale: ${(props) => (props.scalable ? 1.03 : 1.0)};
  }

  &:focus::placeholder {
    color: white;
  }
`;
TextInput.defaultProps = {
  scalable: 0,
};

const ErrorWrapper = styled.div`
  margin: auto;
  background-color: #dc262616;
  border: 1px #dc262655 solid;
  border-radius: 0.5em;
  width: fit-content;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &:empty {
    display: none;
  }
`;

const StyledErrorMsg = styled.span`
  color: #dc2626;
  font-size: 0.7em;
  font-weight: 500;
`;

const ErrorMsg = ({ message }: { message?: string | null }) => {
  return <StyledErrorMsg>{`❗` + message}</StyledErrorMsg>;
};

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

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const query = useSearchParams();
  const provider = query.get("label");
  const router = useRouter();

  const {
    register,
    handleSubmit,
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
                  pattern: {
                    value: /[0-9|\s]{19}/,
                    message: "Неверный формат номера карты",
                  },
                })}
              />

              <TextInput
                placeholder="ММ/ГГ"
                scalable={1}
                {...registerWithMask("cardDate", "datetime", {
                  required: "Укажите дату",
                  inputFormat: "mm/yy",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Неверный формат даты экспирации",
                  },
                })}
              />

              <TextInput
                placeholder="CVC"
                scalable={1}
                {...registerWithMask("cardCvc", ["999"], {
                  required: "Укажите номер CVC",
                  pattern: {
                    value: /[0-9]{3}/,
                    message: "Неверный формат номера CVC",
                  },
                })}
              />
            </CardInfo>
            <PaymentInfo>
              <TextInput
                type="text"
                scalable={0}
                placeholder="Номер для пополнения"
                {...registerWithMask("phoneNumber", ["+7 (999) 999 99-99"], {
                  required: "Укажите номер телефона",
                  pattern: {
                    value: /.7 .[0-9]{3}. [0-9]{3} [0-9]{2}-[0-9]{2}/,
                    message: "Неверный формат номера телефона",
                  },
                })}
              />
              <TextInput
                type="text"
                scalable={0}
                placeholder="Сумма платежа"
                {...registerWithMask("sum", "9{1,4} руб.", {
                  required: "Укажите сумму, макс. 1000р.",
                  pattern: {
                    value: /^(1000|[0-9]{1,3}) руб./,
                    message: "Укажите сумму, макс. 1000р. ",
                  },
                })}
              />
            </PaymentInfo>
          </FlexContainer>
          <SubmitButton type="submit">
            Оплатить
            {loading && <Spinner />}
          </SubmitButton>
          <HomeButton />
          <ErrorWrapper>
            {errors.cardNumber && (
              <ErrorMsg message={errors.cardNumber?.message} />
            )}
            {errors.cardDate && <ErrorMsg message={errors.cardDate?.message} />}
            {errors.cardCvc && <ErrorMsg message={errors.cardCvc?.message} />}
            {errors.phoneNumber && (
              <ErrorMsg message={errors.phoneNumber?.message} />
            )}
            {errors.sum && <ErrorMsg message={errors.sum?.message} />}
          </ErrorWrapper>
        </PayWindow>
      </form>
    </Page>
  );
};

export default Checkout;
