import axios from "axios"
const joinList = (listId,setLoading,jwt,setLists,setError,setListId) => {
    setLoading(true)
    console.log(`http://192.168.31.208:5050/api/v1/user/joinList/${listId}`)
    axios.get(`http://192.168.31.208:5050/api/v1/user/joinList/${listId}`,
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