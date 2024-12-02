import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext,{FirebaseContext} from './store/firebaseContext'
import {app,auth,db}  from './firebase/config';
import ContextSearch from './store/searchContext';
ReactDOM.render(
 <FirebaseContext.Provider value={{app,auth,db}}>
   <ContextSearch> 
    <AuthContext>
    <App /> 
    </AuthContext>
    </ContextSearch>
 </FirebaseContext.Provider>
,


document.getElementById('root'));
