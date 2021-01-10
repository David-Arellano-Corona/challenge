import React,{ useEffect, useState } from 'react';
import { Container, Message, Checkbox, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Loading from '../../components/Loading';
import VehicleInfo from '../../components/VehicleInfo';
import Menu from '../Menu';
import { useQuery, useLast } from '../../hooks/useQuery';
import './Vehicles.css';

export default function Vehicles() {
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState({value:true, label:'name'})
    const [description, setDescription] = useState({value:false, label:'description'});
    const [vehicleClass, setvehicleClass] = useState({value:false, label:'vehicle_class'});
    const [length, setLength] = useState({value:false, label:'length'});
    const [pilot, setPilot] = useState({value:false, label:'pilot'});
    const [films, setFilms] = useState({value:false, label:'films'});
    const [setQuery] = useQuery();

    const [ getLast ] = useLast();
    
    const fetchLast = async () => {
        const last = await getLast()
        const query = "https://ghibliapi.herokuapp.com/vehicles";
       
        if (!last) return
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields:last
            }
        })
        if(status == 200) setVehicle(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 
    }

    useEffect(() => {
        fetchLast()
    }, [])

    const onFilter = async ()=> {
        const query = "https://ghibliapi.herokuapp.com/vehicles";
        const fields = [name, description, vehicleClass, length, pilot, films ].filter( (e)=> { if(e.value) { return e } })
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
        if(status == 200) setVehicle(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 
    }
    return (
        <Menu>
            <Container className="vehicle-content" >
                <div className="vehicle-menu" >
                    <Message info header="Seleccione los campos que desea ver." />
                    <div className="vehicle-menu_forms" >
                        <Checkbox label="Nombre" checked={name.value}/>
                        <Checkbox label="Descripción" checked={description.value} onChange={ () => setDescription({value:!description.value, label:description.label}) } />
                        <Checkbox label="Tipo de vehículo" checked={vehicleClass.value} onChange={ () => setvehicleClass({value:!vehicleClass.value, label:vehicleClass.label}) } />
                        <Checkbox label="Longitud" checked={length.value} onChange={()=> setLength({value:!length.value, label: length.label})} />
                        <Checkbox label="Piloto" checked={pilot.value} onChange={() => setPilot({value:!pilot.value, label:pilot.label})} />
                        <Checkbox label="Peliculas" checked={films.value} onChange={ () => setFilms({value:!films.value, label:films.label}) } />
                        <Button color="vk" onClick={onFilter} ><Icon name="search" /></Button>
                    </div>
                </div>
                <div className="species-screen" >
                        {
                            !loading ?
                            <>
                            {
                                vehicle.map((info, i) => <VehicleInfo info={info} key={i} /> )
                            }
                            </>:<Loading/>
                        }
                </div>
            </Container>
        </Menu>
    )
}
