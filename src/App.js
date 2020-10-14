import React, {useEffect, useState} from 'react';

import './App.css';
import Table from "./components/Table/Table";
import StatusBox from "./components/StatusBox/StatusBox";
import {FormControl,Select,MenuItem,Card} from "@material-ui/core";
import Map from "./components/Map/Map";
import CardContent from "@material-ui/core/CardContent";
import {prettyPrintStat, sortData} from "./util";
import LineGraph from "./components/LineGraph/LineGraph";
import 'leaflet/dist/leaflet.css'


function App() {
  //https://disease.sh/v3/covid-19/countries
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo,setCountryInfo]=useState([]);
  const [tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter] =useState({lat: 34.80746, lng:-40.4796});
  const [mapZoom,setMapZoom]=useState(3);
  const [mapCountries,setMapCountries]=useState([])
  const [casesType,setCasesType] =useState('cases')
  //WorldWide Data
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
        .then((response)=>response.json())
        .then((data)=>{
          setCountryInfo(data);
        })
  },[]);

  useEffect(()=>{
    //async => send a request to a server a ,wait for it and do something
    const getCountriesData = async () =>{
      await fetch('https://disease.sh/v3/covid-19/countries')
          .then((response)=>response.json())
          .then((data)=>{
            
            console.log(data)
            const countries = data.map((country)=>(
                {
                  name:country.country,
                  value:country.countryInfo.iso2,
                }
            ));

            const sortedData = sortData(data);
            setCountries(countries);
            setTableData(sortedData);
            setMapCountries(data)
          })
          console.log(countries);
    };
    getCountriesData();
  },[]);

  const onCountryChange=  async (event)=>{
    const countryCode = event.target.value;


    const url = countryCode === 'worldwide'?
        'https://disease.sh/v3/covid-19/all':
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
        .then(response=> response.json())
        .then((data) =>{
              setCountryInfo(data);
              setCountry(countryCode);
              setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
              setMapZoom(4);
            }
        )


  }

  console.log('Country Info >>> ',countryInfo)
  return (
      <div className="App">
        <div className='app_left'>
          <div className='app_header'>
            <h1>COVID TRACKER</h1>
            <FormControl className='app_dropdown'>
              <Select variant='outlined' onChange={onCountryChange} value={country}>
                <MenuItem value='worldwide'>Worldwide</MenuItem>
                {
                  countries.map((country)=>(
                      <MenuItem value={country.value} >{country.name}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </div>

          {/* StatusBox*/}
          <div className='app_stats'>
            <StatusBox
                isdisplayed
                active={casesType ==='cases'}
                onClick={(e) => setCasesType('cases') }
                title='Coronavirus Cases'
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={prettyPrintStat(countryInfo.cases)}  color='orange'/>
            <StatusBox

                active={casesType ==='recovered'}
                onClick={(e) => setCasesType('recovered') }
                title='Coronavirus Recoveries'
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={prettyPrintStat(countryInfo.recovered)} color='green'/>
            <StatusBox
                isdisplayed
                active={casesType ==='deaths'}
                onClick={ (e) => setCasesType('deaths') }
                title='Coronavirus Deaths'
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={prettyPrintStat(countryInfo.deaths)} color='red'/>
          </div>


          {/*  Map      */}
          <Map
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              countries={mapCountries}
          />


        </div>

        <div className='app_right' >
          <Card className='table_style'>
            <CardContent>
              {/*1*/}
              <h3>Live Cases By Country</h3>
              <Table countries={tableData}/>
              {/*2*/}
            </CardContent>

          </Card>
          <Card className='graph_style'>
            <CardContent>
              <h3>WorldWide New {casesType}</h3>
              <LineGraph casesType={casesType}/>
            </CardContent>
          </Card>
        </div>


      </div>
  );
}

export default App;

// {/*     Header*/}
// {/*Title +select dropdown*/}
//
// {/*case*/}
// {/*recover*/}
// {/*deaths*/}
//
//Table
//Graph
// {/*  Map*/}