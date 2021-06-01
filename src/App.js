import { Card, CardContent, CircularProgress, FormControl, MenuItem, Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table';
import {numberWithCommas} from './util';
import 'leaflet/dist/leaflet.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat:20,lng:77})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries/')
      .then((res)=>res.json())
      .then((data)=>{
        const countries = data.map(country=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ))
        setTableData(data)
        setCountries(countries)
        setmapCountries(data)
      })
      await fetch('https://disease.sh/v3/covid-19/all')
      .then((res)=>res.json())
      .then(data=>{
        setCountryInfo(data)
      })
    }
    getCountriesData()
  }, [])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then((res)=>res.json())
    .then(data=>{
      setCountry(countryCode)
      setCountryInfo(data)
      // setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapCenter({
        lat:data.countryInfo.lat,
        lng:data.countryInfo.long
      })
      setMapZoom(4)
    })
  }
 
  return (
    <div className="app">
      <div className='app_left'>
        <div className='app_header'>
          <h1>Covid Tracker</h1>
          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
              >
              <MenuItem value='Worldwide'>Worldwide</MenuItem>
              {
                countries.sort().map(country=>(
                  <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='app_stats'>
              <InfoBox 
                title='Coronavirus Cases' 
                total={numberWithCommas(countryInfo.cases)} 
                cases={numberWithCommas(countryInfo.todayCases)}/>
              <InfoBox 
                title='Recovered' 
                total={numberWithCommas(countryInfo.recovered)} 
                cases={numberWithCommas(countryInfo.todayRecovered)}/>
              <InfoBox 
                title='Deaths' 
                total={numberWithCommas(countryInfo.deaths)} 
                cases={numberWithCommas(countryInfo.todayDeaths)}/>
        </div>
        <Map 
          countries={mapCountries}
          casesType='cases'
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className='app_right'>
        <CardContent>
          <h3>Live Cases by Countries</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
