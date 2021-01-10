import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, Container, Button, Icon, Checkbox, Message, Transition } from 'semantic-ui-react';
import axios from 'axios';
import Menu from '../Menu';
import Cards from '../../components/Cards';
import Loading from '../../components/Loading';
import { useQuery,useLast } from '../../hooks/useQuery';
import './Films.css'
export default function Films() {
    const [films, setFilms] = useState([])
    const [director, setDirector] = useState({value:false, label:'director'});
    const [producer, setProducer] = useState({value:false, label:'producer'});
    const [score, setScore] = useState({value:false, label:'rt_score'});
    const [release, setRelease] = useState({value:false, label:'release_date'});
    const [title, setTitle] = useState({value:true, label:'title'});
    const [description, setDescription] = useState({value:true, label:'description'});
    const [people, setPeople] = useState({value:false,label:'people'});
    const [species, setSpecies] = useState({value:false,label:'species'});
    const [locations, setLocations] = useState({value:false,label:'locations'});
    const [vehicle, setVehicle] = useState({value:false,label:'vehicles'});
    const [loading, setLoading] = useState(false)
    const [setQuery] = useQuery();
    const [ getLast ] = useLast();
    
    const fetchLast = async () => {
        const last = await getLast()
        const query = "https://ghibliapi.herokuapp.com/films";
        if (!last) return
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields:last
            }
        })
        if(status == 200) setFilms(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 
    }

    useEffect(() => {
        fetchLast()
    }, [])

    const onFilter = async () => {
        const query = "https://ghibliapi.herokuapp.com/films";
        const fields = [title,description, director, producer, release, score, people, species, locations, vehicle ].filter( (e)=> { if(e.value) { return "sds"} })
        .map((e) => e.label).join(',');
        
        setQuery(fields)
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields
            }
        })
        if(status == 200) setFilms(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 

    }

    return (
        <Menu>
            <Container className="content-films" >
                <div className="films-menu" >
                    <Message info header="Seleccione los campos que desea ver." />
                    <div className="films-menu_form" >
                        <Checkbox label="Título" checked={title.value} />
                        <Checkbox label="Descripción" checked={description.value} />
                        <Checkbox label="Director"  checked={director.value} onChange={()=>setDirector({value:!director.value, label:director.label})} />
                        <Checkbox label="Productor"  checked={producer.value}  onChange={()=> setProducer({value:!producer.value, label:producer.label})} />
                        <Checkbox label="Año de lanzamiento" checked={release.value} onChange={() => setRelease({value:!release.value, label:release.label})} />
                        <Checkbox label="Puntuación" checked={score.value} onChange={() => setScore({value:!score.value, label:score.label})} />
                        <Checkbox label="Personas" checked={people.value} onChange={() => setPeople({value:!people.value, label:people.label})} />
                        <Checkbox label="Razas" checked={species.value} onChange={() => setSpecies({value:!species.value, label:species.label})} />
                        <Checkbox label="Ubicaciones" checked={locations.value} onChange={() => setLocations({value:!locations.value, label:locations.label})} />
                        <Checkbox label="Vehículos" checked={vehicle.value} onChange={() => setVehicle({value:!vehicle.value, label:vehicle.label})} />
                        <Button color="vk" onClick={onFilter}  ><Icon name="search" /></Button>
                    </div>
                </div>
                <div className="films-screen" >
                    {
                        !loading ?
                        <>
                            {
                                films.map((film, i) =>  <Cards type="film" title={film.title} description={film.description}  info={film} key={i} /> )
                            }
                        </>:<Loading/> 
                        
                    }
                    
                </div>
            </Container>
        </Menu>
    )
}
