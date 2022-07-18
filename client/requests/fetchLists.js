import axios from "axios";
import LOCALHOST from "../env"


const fetchLists = (jwt,setLists,setCurrentList,setLoading,setError) => {
    setLoading(true);
    axios.get(`${LOCALHOST}:5050/api/v1/user/getAllLists`,
      {
        headers: {
            Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
        }
      }).then((data) => {
        setLoading(false);
        setLists([...data.data.lists]);
        setCurrentList(data.data.lists[0] ? data.data.lists[0] : "");
      }).catch(function (error) {
        setLoading(false);
        if (error.response.data.msg) {
          // Request made and server responded
          setError(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          setError(`Internal Server Error. Please try again later.`);
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Internal Server Error. Please try again later. ${error.message}.`);
        }
    
      });
}

export default fetchLists;