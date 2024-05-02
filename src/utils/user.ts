import bcrypt from "bcrypt"

export const hashPassword=async(password : string)=> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePasswords=async(plaintextPassword:any, hashedPassword:any)=> {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  }