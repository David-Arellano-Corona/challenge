import React,{useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import { Image } from 'semantic-ui-react';
import Home from '../Home';
import Ghibli from '../../assets/img/Ghibli_logo.png';
import './SplashScreen.css';
export default function SplashScreen() {
    
    return (
        <div className="splash-screen" >
            <Image  className="splash-screen-img" src={Ghibli} />
            <Loader type="ThreeDots" color="#a2a2a2" height={80} width={80} />
        </div>
    )
}
