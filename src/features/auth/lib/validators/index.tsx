import { isValidPhoneNumber } from "libphonenumber-js";

export const emailValidate = (value: string) => {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
};

export const phoneValidate = (value: string) => {
  return !isValidPhoneNumber(value);
};

export const validateName = (value: string) => {
  return !/^[a-zA-Z]*$/g.test(value);
};
