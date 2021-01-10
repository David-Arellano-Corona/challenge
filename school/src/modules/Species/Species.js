import React,{ useEffect,useState } from 'react';
import { Container, Message, Checkbox,Icon, Label, Button } from 'semantic-ui-react';
import axios from 'axios';
import Loading from '../../components/Loading';
import Menu from '../Menu';
import SpecieInfo from '../../components/SpecieInfo';
import { useQuery, useLast } from '../../hooks/useQuery';
import './Species.css';

export default function Species() {
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState({value:true, label:'name'});
    const [classification, setClassification] = useState({value:false, label:'classification'});
    const [eyesColor, setEyesColor] = useState({value:false, label:'eye_colors'});
    const [hairColor, setHairColor] = useState({value:false, label:'hair_colors'});
    const [people, setPeople] = useState({value:false, label:'people'});
    const [films, setFilms] = useState({value:false, label:'films'});
    const [setQuery] = useQuery();
    const [ getLast ] = useLast();
    
    const fetchLast = async () => {
        const last = await getLast()
        const query = "https://ghibliapi.herokuapp.com/species";
        if (!last) return
        
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields:last
            }
        })
        if(status == 200) setSpecies(data);
        
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
        const query = "https://ghibliapi.herokuapp.com/species";
        const fields = [name, classification, eyesColor, hairColor, people, films ].filter( (e)=> { if(e.value) { return e } })
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
        if(status == 200) setSpecies(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 
    }

    return (
        <Menu>
            <Container className="species-content" >
                <div className="species-menu" >
                    <Message info header="Seleccione los campos que desea ver." />
                    <div className="species-menu_forms" >
                        <Checkbox label="Nombre" checked={name.value}/>
                        <Checkbox label="Clasificación" checked={classification.value} onChange={ () => setClassification({value:!classification.value, label:classification.label}) } />
                        <Checkbox label="Color de ojos" checked={eyesColor.value} onChange={ () => setEyesColor({value:!eyesColor.value, label:eyesColor.label}) } />
                        <Checkbox label="Color de cabello" checked={hairColor.value} onChange={()=> setHairColor({value:!hairColor.value, label: hairColor.label})} />
                        <Checkbox label="Películas" checked={films.value} onChange={() => setFilms({value:!films.value, label:films.label})} />
                        <Checkbox label="Personas" checked={people.value} onChange={ () => setPeople({value:!people.value, label:people.label}) } />
                        <Button color="vk" onClick={onFilter} ><Icon name="search" /></Button>
                    </div>
                </div>
                <div className="species-screen" >
                        {
                            !loading ?
                            <>
                            {
                                species.map((info, i) => <SpecieInfo info={info} key={i} /> )
                            }
                            </>:<Loading/>
                        }
                </div>
            </Container>
        </Menu>
    )
}
