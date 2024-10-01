import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { generateToken, ValidatePassword } from "../utility";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInputs>req.body;

  try {
    const checkUserExit = await FindVendor("", email);

    if (checkUserExit !== null) {
      const signature = await generateToken({
        _id: checkUserExit.id,
        email: checkUserExit.email,
        foodTypes: checkUserExit.foodType,
        name: checkUserExit.name,
      });

      console.log(signature);

      // validate user
      const validPassword = await ValidatePassword(
        password,
        checkUserExit.password,
        checkUserExit.salt
      );

      if (validPassword) {
        res.status(200).json({
          message: "User Logged In",
          user: checkUserExit,
          //   TO BE REMOVED
          //   sign: signature,
        });
        return;
      } else {
        res.status(409).json({
          "Error-message": "Wrong email/username",
        });
        return;
      }
    }

    res.status(404).json({
      message: "User not Found!",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      Error: "An Error occured during login",
      message: error.message,
    });
    return;
  }
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    if (user) {
      const exisitingUser = await FindVendor(user._id);
      res.status(200).json({
        status: "success",
        user: exisitingUser,
      });
      return;
    }

    res.json({
      message: "Vendor Information Not Found",
    });
    return;
  } catch (error) {
    console.log("Error here");

    res.json(error);
  }
};

export const updateVendorProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const updateVendorService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
