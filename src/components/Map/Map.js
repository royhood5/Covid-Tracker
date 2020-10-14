import React, {Component} from 'react';
import './Map.css'
import {Map as Mappy,TileLayer} from 'react-leaflet'
import {showDataOnMap} from "../../util";
function Map({countries,casesType,center,zoom}){
    return(
        <div className='map'>
          <Mappy
          center={center}
          zoom={zoom}
          >

              {/* Leaflet Standard URL */}
              <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy;
               <a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
              />
          {/*    Loop through data and  draw  red circles*/}
              {showDataOnMap(countries,casesType)}
          </Mappy>
        </div>
    )
}

export default Map;