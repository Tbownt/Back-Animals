import { hash, compare } from "bcryptjs";

const encrypt = async (pass: string) => {
  const passwordHashed = await hash(pass, 10);
  return passwordHashed;
};

const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass, passHash);
  return isCorrect;
};

export { encrypt, verified };
