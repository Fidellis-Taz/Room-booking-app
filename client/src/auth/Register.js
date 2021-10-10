import { useState } from "react";
import { register } from "../api/auth";
import { toast } from "react-toastify";


const Register = ({history}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        //we can also perform some client side vlidation before sending to the backend 

        try {
          const res = await register({name,email,password})
          console.log("REGISTER USER ===> ", res);
          toast.success("Register success .Please Login")
history.push("/login")
        } catch (err) {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        }
      };
      const registerForm = () => (
        <form onSubmit={handleSubmit}>
         <div className="form-group mb-3">
        

         <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />

         </div>

      <button className="btn btn-primary">Submit</button>

        </form>
      );
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h1>Register</h1>
        </div>
        {JSON.stringify([name,email,password])}

        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">{registerForm()}</div>
          </div>
        </div>
      </>
    )
  };
  
  export default Register;
  