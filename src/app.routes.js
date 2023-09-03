import dbConnection from "../DB/connection.js"
import { AppError } from "../util/AppError.js";
import authRouter from "./modules/auth/auth.routes.js";
import brandRouter from "./modules/brands/brands.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import productRouter from "./modules/product/product.routes.js";
import reviewRouter from "./modules/review/review.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import usersRouter from "./modules/users/users.routes.js";

const bootstrap = (app, express) => {

    app.use(express.json())
    dbConnection()

    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/subcategory', subCategoryRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/reviews', reviewRouter);

    app.all("*", (req, res, next) => {
        next(new AppError("Page Not Found", 404))
    })

    app.use((err, req, res, next) => {
        const error = err.message
        const code = err.statusCode || 500
        res.status(code).json({ message: "Error", error, stack: err.stack })
    })

}


export default bootstrap;