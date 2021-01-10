import React from 'react';
import { Card, Image, Button, Icon,Label } from 'semantic-ui-react';
import Location from '../../assets/img/locations.jpg';
import './LocationInfo.css';

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

export default function LocationInfo(props) {
    const { name, climate, films=[], residents=[], surface_water, terrain } = props.info;
    return (
        <Card className="location-info" >
            <Image src={ Location } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    { climate && <p><span className="location-info_bold" >Clima:</span> {climate}</p>}
                    { surface_water && <p><span className="location-info_bold" >Superficie del agua: </span> {surface_water}</p> }
                    { terrain && <p><span className="location-info_bold" >Terreno: </span> {terrain}</p> }
                    <div className="location-info_button" >
                    { films.length ? <ButtonInfo title="Peliculas" size={films.length} icono="video"  onclick={()=>{}} /> : null }
                    { residents.length ? <ButtonInfo title="Habitantes" size={residents.length} icono="female"  onclick={()=>{}} /> : null }
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
