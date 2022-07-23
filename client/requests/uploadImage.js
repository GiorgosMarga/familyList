import axios from "axios"


const uploadImage  = async (image,jwt,setImage,setImageURL,setUploadingImage) => {
    setUploadingImage(true);
    
    axios.post(`${LOCALHOST}:3002/api/v1/items/uploadImage`,
          {
            image
          },
          {
            headers: {
                Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
            }
          }).then((data) => {
            setImage("")
            setImageURL(data.data.url);
            setUploadingImage(false);

          }).catch(function (error) {
            console.log("error")
            setUploadingImage(false);
            if (error.response) {
              // Request made and server responded
              //setError(error.response.data.msg ? error.response.data.msg: "Server Internal Error. Please try later");
            } else if (error.request) {
              // The request was made but no response was received
              //setError("Server Internal Error. Please try later");
            } else {
              // Something happened in setting up the request that triggered an Error
              //setError("Server Internal Error. Please try later");
            }
        
          });
}

export default uploadImage;