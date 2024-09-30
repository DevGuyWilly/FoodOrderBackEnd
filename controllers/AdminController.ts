import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    email,
    foodType,
    ownerName,
    password,
    phone,
    pincode,
  } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor !== null) {
    res.status(409).json({
      error: "User Already Exist",
    });
    return;
  }

  //   generate salt
  const salt = await GenerateSalt();
  // encrypt the password using the salt
  const hashedPassword = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: hashedPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
  });
  res.json(createdVendor);
};
export const GetVendor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const GetVendorByID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
