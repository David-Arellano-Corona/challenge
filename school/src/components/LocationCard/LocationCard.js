import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Locations from '../../assets/img/locations.jpg';
import './LocationCard.css';

export default function LocationCard(props) {
    const {name, climate, terrain, surface_water} = props;
    return (
        <Card className="location-card" >
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <div className="location-card_info" >
                        <p> <span className="location-card_bold" >Clima:</span> {climate}</p>
                        <p><span className="location-card_bold" >Terreno:</span> {terrain}</p>
                        <p><span className="location-card_bold" > Superficie del mar:</span> {surface_water}</p>
                    </div>
                    <div className="location-card_img" ><Image src={Locations} size="small" /></div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
