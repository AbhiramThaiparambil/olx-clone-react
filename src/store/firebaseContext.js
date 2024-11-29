import {createContext, useState} from 'react';

export const FirebaseContext =createContext(null)




export const UserContext =createContext(null);

const AuthContext=({children })=>{
    const [authUser,setAuth]=useState('hi iam user');
    return(
      <UserContext.Provider value={{authUser,setAuth}}>
         {children}
      </UserContext.Provider>
      
    )
}

export default AuthContext