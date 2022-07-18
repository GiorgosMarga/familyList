import axios from "axios";
import LOCALHOST from "../env"


const register = (password,confirmPassword,name,email,setJWT,setError,setLoading) => {
      if(password !== confirmPassword){
        setError("Password don't match.");
        return;
      }
      if(name.length !== 0 && password.length >= 6 && password === confirmPassword && email.length > 3){
        setLoading(true)
        axios.post(`${LOCALHOST}:5050/api/v1/auth/register`,
          {
            username:name,
            email,
            password
          }).then((data) => {
            setJWT(data.data.token)
            setError("")
            setLoading(false)
          }).catch(function (error) {
            setLoading(false)
            if (error.response) {
              // Request made and server responded
              setError(error.response.data.msg ? error.response.data.msg : "Server Internal Error. Please try later");
            } else if (error.request) {
              // The request was made but no response was received
              setError("Internal Server Error. Please Try Agail Later");
            } else {
              // Something happened in setting up the request that triggered an Error
              setError("Internal Server Error. Please Try Agail Later");
            }
        
          });
      }
}
export default register