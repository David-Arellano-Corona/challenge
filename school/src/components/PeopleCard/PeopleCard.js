import React, {useEffect, useState} from 'react';
import { Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import PeopleMale from '../../assets/img/people_male.jpg';
import PeopleFemale from '../../assets/img/people_female.jpg';
import './PeopleCard.css';

export default function PeopleCard(props) {
    const { name, gender, eye_color, hair_color, species } = props;
    const [specie, setSpecie] = useState('');

    const fetchSpecie = async () => {
        const { data, status } = await axios.get(species);
        if(status == 200) setSpecie({name:data.name, classification: data.classification});
    }

    useEffect(() => {
        if(species)fetchSpecie();
    }, [])


    return (
        <Card className="people-card" >
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <div className="people-card_info" >
                        { specie &&  <p> <span className="people-card_bold" >Raza:</span> {specie.name} </p>}
                        { specie &&  <p> <span className="people-card_bold" >Clasificación:</span> {specie.classification} </p> }
                        <p><span className="people-card_bold" >Género:</span> {gender}</p>
                        <p><span className="people-card_bold" >Color de cabello:</span> {hair_color}</p>
                        <p><span className="people-card_bold" >Color de ojo:</span> {eye_color}</p>
                    </div>
                    <div className="people-card_img" ><Image src={gender == 'Female' ? PeopleFemale : PeopleMale} size="small" /></div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
