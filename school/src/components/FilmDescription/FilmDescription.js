import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Icon, Label, Card } from 'semantic-ui-react';
import LocationCard from '../../components/LocationCard';
import PeopleCard from '../../components/PeopleCard';
import SpeciesCard from '../../components/SpeciesCard';
import VehicleCard from '../../components/VehicleCard';
import './FilmDescription.css';
export default function FilmDescription(props) {
    const {info} = props;
    const [locations, setLocations] = useState([]);
    const [people, setPeople] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [carrusel, setCarrusel] = useState(null);


    const fetchData = async (query) => {
        let result = [];
        let { data, status } = await axios.get(query[0]);
        if(status == 200){
            if (Array.isArray(data)){ result = data;}
            else{
                for(let item of query){
                    const { data, status } = await axios.get(item);
                    if(status == 200) result.push(data);
                }
            }

        } 
        return result;
    }
    const  fetchAll = async () => {
        const { locations, people, species, vehicles } = info;
        const resultLocations = locations? await fetchData(locations):[];
        const resultPeople = people? await fetchData(people): [];
        const resultSpecies = species ? await fetchData(species): [];
        const resultVehicles = vehicles ? await fetchData(vehicles): [];
        setLocations(resultLocations);
        setPeople(resultPeople);
        setSpecies(resultSpecies);
        setVehicles(resultVehicles);
        console.log({resultLocations,resultPeople,resultSpecies, resultVehicles});
    }

    useEffect( () => {
        fetchAll();        
    }, [])

    const onCarrusel = (type) => {
        switch(type){
            case 'locations':
                setCarrusel(<>
                    {
                    locations.map( (info, i) => <LocationCard 
                    name={info.name} climate={info.climate} terrain={info.terrain} surface_water={info.surface_water} key={i} /> )
                    }
                </>)
                break;
            case 'people':
                setCarrusel(<>{ people.map((info, i) => <PeopleCard key={i} 
                name={info.name} gender={info.gender} eye_color={info.eye_color} hair_color={info.hair_color} species={info.species}
                />) }</>)    
                break
            case 'species':
                setCarrusel(<>{ species.map( (info, i) => <SpeciesCard key={i} 
                name={info.name} classification={info.classification}
                /> ) }</>)
                break;
            case 'vehicle':
                setCarrusel(<>{ vehicles.map( (info, i) => <VehicleCard key={i} 
                name={info.name} description={info.description} pilot={info.pilot} vehicle_class={info.vehicle_class} length={info.length}    
                /> ) }</>)
                break;         
        }
    }

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
        <div className="film-description" >
            <p><span className="film-description_bold" >Descripción:</span>{info.description}</p>
            { info.director && <p><span className="film-description_bold" >Director:</span> {info.director}</p>}
            { info.producer && <p><span className="film-description_bold" >Productor:</span> {info.producer}</p>}
            { info.release_date && <p><span className="film-description_bold" >Año de lanzamiento:</span> {info.release_date}</p>}
            { info.rt_score && <p><span className="film-description_bold" >Puntuación:</span> {info.rt_score}</p>}
            <div className="film-description_buttons" >
                { locations.length ? <ButtonInfo title="Ubicaciones" size={locations.length} icono="location arrow"  onclick={() => onCarrusel('locations')} />: null}
                { people.length ? <ButtonInfo title="Personas" size={people.length} icono="male"  onclick={ () => onCarrusel('people') } />: null}
                { species.length ?  <ButtonInfo title="Razas" size={species.length} icono="github alternate"  onclick={() => onCarrusel('species')} />: null}
                { vehicles.length ? <ButtonInfo title="Vehiculos"  size={vehicles.length} icono="shipping" onclick={ () => onCarrusel('vehicle') } />: null}
            </div>
            <div className="film-description_content" >
                {carrusel}
            </div>
        </div>
    )
}

