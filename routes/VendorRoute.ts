import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  GetFood,
  VendorLogin,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
} from "../controllers/index";
import { Authenticate } from "../middlewares/index";
import multer from "multer";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const images = multer({ storage: imageStorage }).array("image", 10);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Hello, from Vendor",
  });
});

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", getVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/service", updateVendorService);

router.post("/foods", images, AddFood);
router.get("/foods", GetFood);

export { router as VendorRoute };
