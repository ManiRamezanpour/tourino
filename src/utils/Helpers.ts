// import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string): Promise<string> {
  // const salt = await bcrypt.genSalt();
  // return (await bcrypt.hash(rawPassword, salt)).toString();
  return rawPassword;
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  // return bcrypt.compare(rawPassword, hashedPassword);
  return rawPassword;
}
