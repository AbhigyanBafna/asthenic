import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import bgVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  const responseGoogle= (response) => {
    var decodedHeader = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decodedHeader));

    const { name, sub, picture } = decodedHeader;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace : true})
      });
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} >

      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          
          <video 
            src={bgVideo}
            type="video/mp4"
            loop muted autoPlay
            controls={false}
            className = 'w-full h-full object-cover'>
          </video>


          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='relative bottom-10'>
              <img src={logo} width="500rem" alt='logo'></img>
            </div>
            
            <div className='shadow-2xl'>

                <GoogleLogin 
                  onSuccess={responseGoogle}
                  onError={responseGoogle}
                  cookie_policy= "single_host_origin"
                  theme='filled_blue'
                  shape='pill'
                  native_callback= "handleResponse"
                  auto_select= "true"
                  ux_mode='popup'
                  allowed_parent_origin="http://localhost:3000"
                  itp_support="true">
                </GoogleLogin>

            </div>
          </div>

        </div>
      </div>
      
      
    </GoogleOAuthProvider>
  )
}

export default Login