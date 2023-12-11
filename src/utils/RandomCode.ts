export const codeGenerator = (n: number) => {
  const digits: string = '0123456789';
  let otp: string = '';

  for (let i = 0; i < n; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};
