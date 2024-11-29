import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext,{FirebaseContext} from './store/firebaseContext'
import {app,auth,db}  from './firebase/config';

ReactDOM.render(
 <FirebaseContext.Provider value={{app,auth,db}}>
    <AuthContext>
    <App /> 
    </AuthContext>
 </FirebaseContext.Provider>
,


document.getElementById('root'));
