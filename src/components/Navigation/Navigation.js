import React from 'react';

const Navigation = ({routechange, isloggedin}) => {
    
        if(isloggedin){
        return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>routechange('signout')} className='f4 pa3 link underline dim pointer light-pink'>Sign Out</p>
        </nav>
        );}
        else{
            return(
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                    <p onClick={()=>routechange('signin')} className='f4 pa3 link underline dim pointer light-pink'>Sign In</p>
                    <p onClick={()=>routechange('register')} className='f4 pa3 link underline dim pointer light-pink'>Register</p>
                </nav>
                );
        }
}
export default Navigation;