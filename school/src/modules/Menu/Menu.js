import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Menu.css';

export default function Menu(props) {

    const menu = [{display:'Historial', url:"/"},{display:"Peliculas", url:"/films"},{display:"Personas", url:"/people"},{display:"Ubicaciones", url:"/ubications"},
    {display:"Razas", url:"/species"},{display:"Vehiculos", url:"/vehicle"}];

    const { pathname } = useLocation();

    return (
        <div className="menu-content" >
            <div className="menu" >
                <div className="menu-title">STUDIO GHIBLI</div>
                <div className="menu-items" >
                    {
                        menu.map(  (item, key) => {
                            return(
                                <NavLink to={item.url}  key={key} className={ pathname == item.url ? "menu-item menu-item-selected"  : "menu-item"} >
                                    {item.display}
                                </NavLink>
                            )
                        } )
                    }
                </div>
            </div>
            {props.children}
        </div>
    )
}
