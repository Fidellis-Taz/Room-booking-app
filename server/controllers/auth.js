import User from "../models/user";
import jwt from "jsonwebtoken";

export const showMessage = (req, res) => {
    res.status(200).send(`Here is your message:  ${req.params.message}`);
  };

  export const register =async (req , res) => {
console.log(req.body);
const {name,email,password} = req.body;

//validation
if(!name) return res.status(400).send("Name is required")
if(!password || password.length < 6) {
return res
.status(400)
.send("Password is required and should be min 6 characters long")
}

let userExist = await User.findOne({email}).exec()
if(userExist) return res.status(400).send("Email is taken")

//register
const user = new User(req.body)

try {
    await user.save()
    console.log("User created", user);
    return res.json({ok:true})
} catch (error) {
    console.log("Create user ERROR", error);
    res.status(400).send("Error. Please Try again")
}

  }

export const login = async (req, res) => {
    const {email,password} = req.body

    try {
        //check if user with that email exist
        let user = await User.findOne({email}).exec()

        if(!user) res.status(400).send("User with that email not found")
        //compare passsword
        user.comparePassword(password, (err, match)=>{
            console.log("COMPARE PASSWORD IN LOGIN ERR", err);
            if(!match || err) return res.status(400).send("Wrong Password")
            //Generate a token then send as response to client 
            let token = jwt.sign({ _id:user._id}, process.env.JWT_SECRET,{
                expiresIn:"7d",
            })
            res.json({
                token,
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt
                }
            })
        })
    } catch (error) {
        console.log("LOGIN ERROR", error);
        res.status(400).send("Sign in failed")
    }
}
















