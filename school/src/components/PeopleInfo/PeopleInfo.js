import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import PeopleFemale from '../../assets/img/people_female.jpg';
import PeopleMale from '../../assets/img/people_male.jpg';
import './PeopleInfo.css';
export default function PeopleInfo(props) {
    const {name, age,eye_color, films, gender, hair_color, species} = props.info;
    const [specie, setSpecie] = useState({human:'', classification:''});
    const [filmsInfo, setFilmsInfo] = useState([])

    const fetchData = async () => {
        if(species){
            const { data, status } = await axios.get(species);
            if( status == 200 ) setSpecie({human: data.human, classification: data.classification});
        }
        if(films){
            let arrayFilms = [];
            for(let film of films){
                const {data, status} = await axios.get(film);
                if(status == 200) arrayFilms.push(data);
            }
            setFilmsInfo(arrayFilms);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const ButtonInfo = (props) => {
        const {title, size, icono} = props
        return (
            <Button as="div" labelPosition="right" onClick={props.onclick} >
                <Button icon >
                    <Icon name={icono} />
                    {title}
                </Button>
                <Label as="a" basic pointing="left" >
                    {size}
                </Label>
            </Button>
        )
    }

    return (
        <Card className="people-info" >
            <Image src={ gender=="Female" ? PeopleFemale: PeopleMale } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    { gender && <p><span className="people-info_bold" >Género:</span> {gender}</p>}
                    { specie.human && <p><span className="people-info_bold" >Raza: </span> {specie.human}</p> }
                    {specie.classification && <p><span className="people-info_bold" >Clasificación:</span> {specie.classification}</p>}
                    { age && <p><span className="people-info_bold" >Edad: </span> {age}</p> }
                    {eye_color && <p><span className="people-info_bold" >Color de ojos:</span> {eye_color}</p>}
                    {hair_color && <p><span className="people-info_bold" >Color de cabello:</span> {hair_color}</p>}
                    { filmsInfo.length ? <ButtonInfo title="Peliculas" size={filmsInfo.length} icono="video"  onclick={()=>{}} /> : null }
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
