import User from "../models/user";

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