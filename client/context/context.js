import React from "react";

const MyContext = React.createContext({
    jwt: null,
    setJWT: (jwt) => {},
    socket:null,
    setSocket: () => {}
});
export default MyContext;
