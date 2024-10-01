import express, { Request, Response, NextFunction } from "express";
import {
  VendorLogin,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
} from "../controllers/index";
import { Authenticate } from "../middlewares/index";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Hello, from Vandor",
  });
});

router.post("/login", VendorLogin);
router.get("/profile", Authenticate, getVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/service", updateVendorService);

export { router as VendorRoute };
