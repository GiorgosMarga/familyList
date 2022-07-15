import axios from "axios";
const login = (password,email,setLoading,setError,setJWT,setEmail,setPassword) => {
    if(password.length >= 6 && email.length > 3){
        setLoading(true);
        axios.post('http://192.168.31.208:5050/api/v1/auth/login',
          {
            email,
            password
          }).then((data) => {
            setLoading(false);
            setError("");
            setJWT(data.data);
          }).catch(function (error) {
            setLoading(false)
            if (error.response) {
              // Request made and server responded
              setError(error.response.data.msg ? error.response.data.msg: "Server Internal Error. Please try later");
            } else if (error.request) {
              // The request was made but no response was received
              setError("Server Internal Error. Please try later");
            } else {
              // Something happened in setting up the request that triggered an Error
              setError("Server Internal Error. Please try later");
            }
        
          });
          setEmail("");
          setPassword("");  
      }
}


export default login;