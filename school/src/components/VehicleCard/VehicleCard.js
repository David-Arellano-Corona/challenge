import React, { useState, useEffect } from 'react';
import { Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import Vehicle from '../../assets/img/vehicle.jpg'
import './VehicleCard.css';
export default function VehicleCard(props) {
    const {name, description, pilot, vehicle_class, length} = props;
    const [namePilot, setNamePilot] = useState('');

    const fetchPilot = async () => {
        const {data, status} = await axios.get(pilot);
        if(status == 200) setNamePilot(data.name);
    }

    useEffect(() => {
        if(pilot) fetchPilot();
    }, [])
    return (
        <Card className="vehicle-card" >
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <div className="vehicle-card_info" >
                        <p> <span className="vehicle-card_bold" >Descripción:</span> {description}</p>
                        { namePilot && <p> <span className="vehicle-card_bold" >Piloto:</span> {namePilot}</p>}
                        <p> <span className="vehicle-card_bold" >Clase:</span> {vehicle_class}</p>
                        <p> <span className="vehicle-card_bold" >Dimensión:</span> {length}</p>
                    </div>
                    <div className="vehicle-card_img" ><Image src={Vehicle} size="small" /></div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
