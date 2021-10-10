//we are able to use import here in node instaed of require because we used a package called esm
import express from "express"
import cors from "cors"
import {readdirSync} from "fs"
import mongoose from "mongoose"
const morgan = require("morgan")
require("dotenv").config()

const app = express()

//database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));



// middlewares
app.use(cors());
app.use(morgan("dev"));
//in order to avoid importing every routes created in the roues folder we autoload the routes using fs system
readdirSync("./routes").map((r)=> app.use("/api", require(`./routes/${r}`)))

const port = process.env.PORT || 8000;


app.listen(port, () => console.log(`Server is running on port ${port}`));
