import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Species from '../../assets/img/species.jpg';
import './SpeciesCard.css';
export default function SpeciesCard(props) {
    const {name, classification} = props;
    return (
        <Card className="species-card" >
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <div className="species-card_info" >
                        <p> <span className="species-card_bold" >Clasificación:</span> {classification}</p>
                    </div>
                    <div className="species-card_img" ><Image src={Species} size="small" /></div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
