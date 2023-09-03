import cloudinary from "../src/multer/cloudinary.js";
import { ApiFeatures } from "./ApiFeatures.js";
import { AppError } from "./AppError.js";

export const getData = (model, n) => {
  // console.log(n);
  return async (req, res) => {
    const apiFeatures = new ApiFeatures(model.find(), req.query)
      .pagination()
      .sort()
      .filter()
      .fields()
      .search();

    let result = await apiFeatures.mongooseQuery;

    res.json({
      message: "success",
      page: apiFeatures.queryString.page || 1,
      result,
    });
  };
};

export const deleteData = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findByIdAndDelete(id);
    if (!result) {
      return next(new AppError("Not Found", 404));
    }
    if (result.user) {
      if (result.user !== userId) {
        return next(new AppError("Not Authorized", 401));
      }
    }
    res.status(201).json({ message: "success", result });
  };
};

export const getDocById = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findById(id);

    if (result) {
      return res.status(200).json({ message: "success", result });
    } else {
      return next(new AppError("Not Found", 404));
    }
  };
};

export const deleteImg = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const { public_id } = req.body;
    const { result } = await cloudinary.uploader.destroy(
      `${public_id}`,
      (result) => {
        return result;
      }
    );
    if (result === "ok") {
      await model.findByIdAndUpdate(id, { logo: null });
      return res.json({ message: "success", param: "Image Deleted" });
    } else if (result === "not found") {
      return next(new AppError("In-Valid public_id", 404));
    }
  };
};
