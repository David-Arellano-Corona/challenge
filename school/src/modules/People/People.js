import React, { useEffect, useState } from 'react'
import { Container, Message, Checkbox, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Menu from '../Menu';
import Loading from '../../components/Loading';
import PeopleInfo from '../../components/PeopleInfo';
import { useQuery, useLast } from '../../hooks/useQuery';
import './People.css'

export default function People() {
    const [people, setPeople] = useState([])
    const [name, setName] = useState({value:true, label:"name"});
    const [age, setAge] = useState({value:false, label:'age'});
    const [gender, setgender] = useState({value:false, label:'gender'});
    const [eyeColor, setEyeColor] = useState({value:false, label:'eye_color'});
    const [hairColor, sethairColor] = useState({value:false, label:'hair_color'});
    const [films, setFilms] = useState({value:false, label:'films'});
    const [species, setSpecies] = useState({value:false, label:'species'});
    const [loading, setLoading] = useState(false);
    const [setQuery] = useQuery();
    const [ getLast ] = useLast();
    
    const fetchLast = async () => {
        const last = await getLast()
        const query = "https://ghibliapi.herokuapp.com/people";
        if (!last) return
        setLoading(true)
        try{
        const { data, status } = await axios.get(query,{
            params:{
                fields:last
            }
        })
        if(status == 200) setPeople(data);
        
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
        const query = "https://ghibliapi.herokuapp.com/people";
        const fields = [name,age, gender, eyeColor, hairColor, films, species ].filter( (e)=> { if(e.value) { return e } })
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
        if(status == 200) setPeople(data);
        
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        } 

    }

    return (
        <Menu>
            <Container className="content-people" >
                <div className="people-menu" >
                    <Message info header="Seleccione los campos que desea ver." />
                    <div className="people-menu_forms" >
                        <Checkbox label="Nombre" checked={name.value}/>
                        <Checkbox label="Edad" checked={age.value} onChange={ () => setAge({value:!age.value, label:age.label}) } />
                        <Checkbox label="Género" checked={gender.value} onChange={ () => setgender({value:!gender.value, label:gender.label}) } />
                        <Checkbox label="Color de ojo" checked={eyeColor.value} onChange={()=> setEyeColor({value:!eyeColor.value, label: eyeColor.label})} />
                        <Checkbox label="Color de cabello" checked={hairColor.value} onChange={() => sethairColor({value:!hairColor.value, label:hairColor.label})} />
                        <Checkbox label="Películas" checked={films.value} onChange={() => setFilms({value:!films.value, label:films.label})} />
                        <Checkbox label="Razas" checked={species.value} onChange={ () => setSpecies({value:!species.value, label:species.label}) } />
                        <Button color="vk" onClick={onFilter} ><Icon name="search" /></Button>
                    </div>
                </div>
                <div className="people-screen" >
                        {
                            !loading ?
                            <>
                                {
                                    people.map( (info, i) => <PeopleInfo info={info} key={i} /> )
                                }
                            </>:
                            <Loading/>
                        }
                </div>
            </Container>
        </Menu>
    )
}
