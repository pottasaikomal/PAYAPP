import express from "express";
import rootRouter from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(cors()); //allows connection with all endpoint URL's cross origin resource sharing. Also we can use URL whitelisting or blacklisting here.
app.use(express.json()); // body parser useful for parsing the data we are getting in raw format to readable json data.
app.use('/api/v1', rootRouter); // routes our requests starts with api/vi/* to rootRouter.
app.listen(3000,console.log("listening on port 3000"));