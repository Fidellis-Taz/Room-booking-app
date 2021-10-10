//we are able to use import here in node instaed of require because we used a package called esm
import express from "express"
import cors from "cors"
import {readdirSync} from "fs"

const app = express()

//middlewares
app.use(cors())
//in order to avoid importing every routes created in the roues folder we autoload the routes using fs system
readdirSync("./routes").map((r)=> app.use("/api", require(`./routes/${r}`)))



app.listen(5000, () => console.log(`Server is running on port 5000`));
