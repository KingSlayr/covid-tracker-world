import React from 'react'
import { Circle, Popup } from "react-leaflet";
import { caseTypeColors, numberWithCommas } from './util';

export default function Circles({data,casesType='cases'}) {
    return (
        data.map(country=>(
            <Circle
                center = {[country.countryInfo.lat,country.countryInfo.long]}
                fillOpacity={0.2}
                color={caseTypeColors[casesType].color}
                fillColor={caseTypeColors[casesType].color}
                radius={
                    Math.sqrt(country[casesType])*caseTypeColors[casesType].multiplier/2
                }
            >
                <Popup>
                    <h1>{country.country}</h1>
                    <h3>{numberWithCommas(country[casesType])}</h3>
                </Popup>
            </Circle>
        ))
    )
}
