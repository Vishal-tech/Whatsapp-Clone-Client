import React from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Logout(){
    
    const history = useHistory();

    const { signout } = useAuth();
  
    const handleSignout = () => {
      signout();
      history.push('/Login');
    };
  
    return(
        <div>
            <button onClick={handleSignout}>Log out</button>
        </div>
    )
}

export default Logout;