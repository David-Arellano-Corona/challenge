import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const URL = "http://localhost:2332/api/v1/histo";



export function useQuery(){
    const { pathname } = useLocation();
    
    const setQuery = async (query) =>{
        const result = await axios.post(URL,{url:pathname, query});
    }
    
    return [setQuery];
}

export async function getHistorical(){
    const {data ,status} =await axios.get(URL);
    if( status == 200 ) return data.data;
    return []
}

export function useLast(){
    const { pathname } = useLocation();

    const getLast = async () => {
        const {data, status} = await axios.get(`${URL}/last`,{params:{path:pathname}});
        if(status == 200) return data.query;
        return ''
    }
    return [ getLast ]

}