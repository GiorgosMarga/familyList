import axios from "axios"

const deleteList = (listId,setLoading,jwt,setLists,setError,setCurrentList) => {
    setLoading(true);
    axios.patch('http://192.168.31.208:5050/api/v1/user/deleteList',
      {
        listId: listId
      },
      {
        headers: {
            Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
        }
      }).then((data) => {
        setLists([...data.data.lists]);
        setCurrentList(data.data.lists[0] ? data.data.lists[0] : "");
        setLoading(false);
      }).catch(function (error) {
        setLoading(false)
        if (error.response) {
          // Request made and server responded
          setError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setError('Internal Error. Try again later!');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError('Internal Error. Try again later!');
        }
    
      });
}

export default deleteList