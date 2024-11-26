import { createContext,useContext,useState,useEffect, Children } from "react";
import { getCurrentUser } from "@/lib/appwrite";

const GlobalContext = createContext(null);

export const useGlobalContext = () =>{
  return useContext(GlobalContext);
}

export const GlobalProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    getCurrentUser().
    then((res)=>{
      if(res){
        setIsLoggedIn(true);
        setUser(res);
      }
      else{
        setIsLoggedIn(false);
        setUser(null);
      }
    }).
    catch(
      (e)=>console.log(e)
    ).
    finally(()=>{
      setIsLoading(false)
    })
  },[])


  return (
      <GlobalContext.Provider
      value = {
        {
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser
        }
      }
      >
        {children}
      </GlobalContext.Provider>
  )
}