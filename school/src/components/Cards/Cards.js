import React,{ useState } from 'react';
import { Segment} from 'semantic-ui-react';
import FilmDescription from '../FilmDescription';
import ModalDescription from '../ModalDescription';
import Ghibli from '../../assets/img/Ghibli_logo.png';
import './Cards.css';
export default function Cards(props) {
    const { type, title, description, info } = props;
    const [show, setShow] = useState(false)
    const [children, setChildren] = useState(null)

    const onModalOpen = () => {
        const child = null;
        switch( type ){
            case 'film':
                setChildren(<FilmDescription info={info} />)

        }
        setShow(true)
    }

    const onModalClose = () => {
        setShow(false);
        setChildren(null);
    }

    return (
        <>
        <Segment className="cards" >
            <h3 >{title}</h3>
            <p className="card-description" >{`${description.substr(0,150)}...`}</p>
            <div className="card-see_more" >
                <span onClick={onModalOpen} >Ver más</span>
            </div>
        </Segment>
        <ModalDescription show={show} onModalClose={onModalClose} title={title} img={Ghibli} children={children}/>
        
        </>
    )
}
