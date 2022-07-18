import axios from "axios"
import LOCALHOST from "../env"


const joinList = (listId,setLoading,jwt,setLists,setError,setListId) => {
    setLoading(true)
    axios.get(`${LOCALHOST}:5050/api/v1/user/joinList/${listId}`,
    {
      headers: {
          Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
      }
    }
    ).then((data) => {
        setLists(data.data.lists);
        setLoading(false);
        setError(false);
        setListId("");
      }).catch(function (error) {
        setLoading(false)
        setListId("")
        if (error.response) {
          // Request made and server responded
          setError(error.response.data.msg)
          // setError(error.response.data)
        } else if (error.request) {
          // The request was made but no response was received
          setError("Internal Server Error. Please try agail later!")
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Internal Server Error. Please try agail later!")
        }
      });
}

export default joinList;