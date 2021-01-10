import React from 'react';
import Loader from 'react-loader-spinner';
import { Image } from 'semantic-ui-react';
import Ghibli from '../../assets/img/Ghibli_logo.png';
import './Loading.css';

export default function Loading() {
    return (
        <div className="loading" >
            <Image src={Ghibli} size="medium" />
            <Loader type="ThreeDots" color="#dddddd" height={150} width={150} />
        </div>
    )
}
