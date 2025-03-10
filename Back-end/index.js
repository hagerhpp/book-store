import express, { response } from "express";
import { PORT } from "./config.js";

const app = express();
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Wecome to our book store')
})
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});