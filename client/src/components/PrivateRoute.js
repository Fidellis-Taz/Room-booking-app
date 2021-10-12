import { Route , Redirect} from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = () =>{

    const {auth} = useSelector((state)=> ({...state}))

    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />

}

export default PrivateRoute