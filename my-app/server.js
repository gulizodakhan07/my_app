import express from "express";
import bodyParser from "body-parser";
import { categoryRoutes } from "./routes/category.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { orderRoutes } from "./routes/order.routes.js";
import { contractsRoutes } from "./routes/contracts.routes.js";
import { paymentRoutes } from "./routes/payment.routes.js";
import { orderItemRoutes } from "./routes/orderItem.routes.js";

const port = 9000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/contracts', contractsRoutes);
app.use('/payment',paymentRoutes)
app.use('/orderItem',orderItemRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
