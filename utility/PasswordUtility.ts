import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VendorPayLoad } from "../dto";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { AuthPayLoad } from "../dto/index";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
): Promise<Boolean> => {
  const hashedPass = await GeneratePassword(enteredPassword, salt);
  return hashedPass === savedPassword;
};

export const generateToken = async (payload: VendorPayLoad) => {
  const sign = jwt.sign(payload, APP_SECRET, { expiresIn: "10h" });
  return sign;
};

export const verifyToken = async (req: Request) => {
  const sign = req.get("Authorization");

  if (sign) {
    const payload = jwt.verify(sign.split(" ")[1], APP_SECRET) as AuthPayLoad;

    req.user = payload;

    return true;
  }

  return false;
};
