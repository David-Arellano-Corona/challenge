import React from 'react';
import { Card, Image, Label,Icon, Button } from 'semantic-ui-react';
import Specie from '../../assets/img/species.jpg';
import './SpecieInfo.css';

export default function SpecieInfo(props) {
    const { name, classification, eye_colors, hair_colors, people=[], films=[] } = props.info;
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
        <Card className="specie-info" >
            <Image src={ Specie } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    { classification && <p><span className="specie-info_bold" >Clasificación:</span> {classification}</p>}
                    { eye_colors && <p><span className="specie-info_bold" >Color de ojos: </span> {eye_colors}</p> }
                    {hair_colors && <p><span className="specie-info_bold" >Color de cabello :</span> {hair_colors}</p>}
                    <div className="species-info_button" >
                    { films.length ? <ButtonInfo title="Peliculas" size={films.length} icono="video"  onclick={()=>{}} /> : null }
                    { people.length ? <ButtonInfo title="Personas" size={people.length} icono="female"  onclick={()=>{}} /> : null }
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
