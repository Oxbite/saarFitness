import axios from "axios";
import { useEffect, useState } from "react";
import LoginPage from "src/pages/pages/login";

export default function LoginOrDefault({def}){
   const [loggedIn, setLoggedIn] = useState(false);
   useEffect(()=>{
    const api = async ()=>{
      try{
        await axios.get("/api/authenticate");
        setLoggedIn(true);
      }catch(e){
       setLoggedIn(false);
      }
    }
     api();
   }, []);

  if(loggedIn) return def;
  return (
    <LoginPage />
  )

}


