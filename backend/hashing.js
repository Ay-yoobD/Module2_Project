import bcrypt from "bcrypt";

const HashingPass = async (Password) => {
  const SaltRounds = 10; 
  const Hashedpass = await bcrypt.hash(Password, SaltRounds);
  return Hashedpass;

};

export{HashingPass}