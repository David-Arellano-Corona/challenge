import React, {useEffect, useState} from 'react';
import { Container, List } from 'semantic-ui-react';
import Menu from '../Menu';
import { getHistorical } from '../../hooks/useQuery';
import './Home.css'
export default function Home() {
    const [histo, setHisto] = useState([]);
    const fetchData = async () => {
        const result = await getHistorical();
        console.log(result)
        setHisto(result);
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Menu>
           <Container className="home-content">
                <div className="home-menu" >
                    <h2>Historial</h2>
                </div>
                <div className="home-screen" >
                     <List divided verticalAlign='middle'>
                        {
                            histo.map( (info, i) => 
                                <List.Item key={i} >
                                    <List.Content>
                                        <span className="home-content_item date" >{info.date}</span>
                                        
                                        <span className="home-content_item query" >Campos Buscados: {info.query}</span>
                                        <span className="home-content_item url " >{info.url}</span>
                                    </List.Content>
                                </List.Item>
                             )
                        }
                     </List>
                </div>
            </Container>
        </Menu>
    )
}
