import { createContext, useState } from "react";

export let UserToken= createContext(null);

export default function UserTokenProvider(props){
    
    let[isLogin,setIsLogin]= useState(null);
    

    return <UserToken.Provider value={{isLogin , setIsLogin}}>
        {props.children}
    </UserToken.Provider>
     
}



