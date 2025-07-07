export const isInvalidPhoneNumber = (phoneNumber: string) => {
  return !/^\+\d{6,15}$/.test(phoneNumber);
};

export const isPasswordTheSame = (
  password1: HTMLFormElement,
  password2: HTMLFormElement
) => {
  return password1.value != password2.value;
};
