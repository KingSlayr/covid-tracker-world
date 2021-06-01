import React from 'react'
import './Table.css'
import { numberWithCommas, sortData } from './util'

export default function Table({countries}) {
    countries = sortData(countries)
    return (
        <div className='table'>
            <tr style={{fontSize:'1.3em'}}>
                <td><strong>Country</strong></td>
                <td><strong>Cases</strong></td>
            </tr>         
            {countries.map(country=>(
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{numberWithCommas(country.cases)}</strong></td>
                </tr>
            ))}
        </div>
    )
}
