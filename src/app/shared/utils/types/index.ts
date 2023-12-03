export type Inputs = {
  cardNumber: string;
  cardDate: string;
  cardCvc: string;
  phoneNumber: string;
  sum: string;
};

export type Validation = Record<
  string,
  {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
    inputFormat?: string;
  }
>;
