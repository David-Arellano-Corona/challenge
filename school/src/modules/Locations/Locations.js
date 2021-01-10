import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Container,Message, Checkbox, Button, Icon } from 'semantic-ui-react';
import Menu from '../Menu';
import Loading from '../../components/Loading';
import LocationInfo from '../../components/LocationInfo';
import { useQuery, useLast } from '../../hooks/useQuery';
import './Locations.css';

export default function Locations() {
    const [locations, setLocations] = useState([])
    const [name, setName] = useState({value:true, label:'name'});
    const [climate, setClimate] = useState({value:false, label:'climate'});
    const [terrain, setTerrain] = useState({value:false, label:"terrain"});
    const [surfaceWater, setsurfaceWater] = useState({value:false, label:'surface_water'});
    const [residents, setResidents] = useState({value:false, label:'residents'});
    const [films, setFilms] = useState({value:false, label:'films'});
    const [loading, setLoading] = useState(false);
    const [setQuery] = useQuery();

    const [ getLast ] = useLast();
    
    const fetchLast = async () => {
        const last = await getLast()
        const query = "https://ghibliapi.herokuapp.com/locations";
        if (!last) return
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields:last
            }
        })
        if(status == 200) setLocations(data);
        
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
        const query = "https://ghibliapi.herokuapp.com/locations";
        const fields = [name,climate, terrain, surfaceWater, residents, films ].filter( (e)=> { if(e.value) { return e } })
        .map((e) => e.label).join(',');
        setQuery(fields)
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields
            }
        })
        console.log(data)
        if(status == 200) setLocations(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 
    }

    return (
        <Menu>
            <Container className="location-content">
                <div className="location-menu" >
                    <Message info header="Seleccione los campos que desea ver." />
                    <div className="location-menu_forms" >
                        <Checkbox label="Nombre" checked={name.value}/>
                        <Checkbox label="Clima" checked={climate.value} onChange={ () => setClimate({value:!climate.value, label:climate.label}) } />
                        <Checkbox label="Terreno" checked={terrain.value} onChange={ () => setTerrain({value:!terrain.value, label:terrain.label}) } />
                        <Checkbox label="Superficie del mar" checked={surfaceWater.value} onChange={()=> setsurfaceWater({value:!surfaceWater.value, label: surfaceWater.label})} />
                        <Checkbox label="Habitantes" checked={residents.value} onChange={() => setResidents({value:!residents.value, label:residents.label})} />
                        <Checkbox label="Películas" checked={films.value} onChange={() => setFilms({value:!films.value, label:films.label})} />
                        <Button color="vk" onClick={onFilter} ><Icon name="search" /></Button>
                    </div>
                </div>
                <div className="location-screen" >
                     {
                        !loading ?
                        <>
                            {
                                locations.map((info ,i) => <LocationInfo info={info} key={i} />)
                            }
                        </>:<Loading/>
                     }     
                </div>
            </Container>
        </Menu>
    )
}
