import axios from "axios"
import LOCALHOST from "../env"


const fetchAllItems = (jwt,setItems,currentListId,setError,setLoading) => {
    setLoading(true)
    axios.get(`${LOCALHOST}:3002/api/v1/lists/allItemsList/${currentListId}`,
    {
      headers: {
          Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
      }
    }
    ).then((data) => {
        setItems(data.data.items);
        setLoading(false)
        setError("")
      }).catch(function (error) {
        setLoading(false)
        if (error.response.data.msg) {
          // Request made and server responded
          setError(error.response.data.msg)
        } else if (error.request) {
          // The request was made but no response was received
          setError("Internal Server Error. Please try agail later!")
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Internal Server Error. Please try agail later!")
        }
      });
}   

export default fetchAllItems