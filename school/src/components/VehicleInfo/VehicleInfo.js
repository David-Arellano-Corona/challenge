import React,{ useEffect, useState } from 'react';
import { Card, Image,Button, Label, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Vehicle from '../../assets/img/vehicle.jpg';
import './VehicleInfo.css';

export default function VehicleInfo(props) {
    const {films=[], length, name, pilot, vehicle_class, description} = props.info;
    const [pilotName, setPilotName] = useState('');
    const fetchData = async () => {
        const {data, status} = await axios.get(pilot);
        if(status == 200) setPilotName(data.name);
    }
    useEffect(() => {
        if(pilot)fetchData()
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
        <Card className="vehicle-info" >
            <Image src={ Vehicle } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    { vehicle_class && <p><span className="vehicle-info_bold" >Tipo de vehículo:</span> {vehicle_class}</p>}
                    { description && <p><span className="vehicle-info_bold" >Descripción:</span> {description}</p>}
                    { pilot && <p><span className="vehicle-info_bold" >Piloto:</span> {pilotName}</p>}
                    { length && <p><span className="vehicle-info_bold" >Longitud: </span> {length}</p> }
                    <div className="vehicle-info_button" >
                    { films.length ? <ButtonInfo title="Peliculas" size={1} icono="video"  onclick={()=>{}} /> : null }
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
