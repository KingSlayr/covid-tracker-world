import React, { useState } from 'react'
import {LayerGroup, MapContainer as LeafletMap,TileLayer} from "react-leaflet"
import Circles from './Circles';
import './Map.css'

export default function Map({countries,casesType,center,zoom}) {
    const [map, setmap] = useState(null);
    if (map) {
        // map.flyTo(center);
        map.setView(center, zoom);
    }
    // const circles = showDataOnMap(countries,casesType)
    // console.log('Circles>>>>>>>>>>>>>>>',circles);
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom} whenCreated={setmap}>
                <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    >
                </TileLayer>
                <LayerGroup>
                    <Circles data={countries}/>
                </LayerGroup>
            </LeafletMap>
        </div>
    )
}
