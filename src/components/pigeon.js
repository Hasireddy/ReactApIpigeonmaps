import React, { useState, useEffect } from 'react';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { osm } from 'pigeon-maps/providers';
import pigeon_image from '../assets/pigeon.jpg';
import pigeons from '../pigeon.json';
const MyMap = () => {
    const [center, setCenter] = useState([50.879, 4.6997]);
    const [zoom, setZoom] = useState(10);
    const [hue, setHue] = useState(0);
    const [cities, setCities] = useState([]);
    const getData = () => {
        return (
            fetch('https://gist.githubusercontent.com/Hasireddy/aba9d592a07b7f6ab93cac6bc8be4a96/raw/1e516c15675c505f045c2d09a26c4fcc62e9076c/germancities.json')
                .then(response => response.json())
                .then(data => setCities(data)));


    }
    useEffect(() => { getData() },
        []);

    const color = `hsl(${hue % 360}deg 39% 70%)`;
    // console.log("center", center, "-", "zoom", zoom);
    // console.log(pigeons);
    // console.log(cities);

    return (
        <>
            <Map height={700} defaultCenter={center} defaultZoom={zoom} provider={osm} onBoundsChanged={({ center, zoom }) => {
                setCenter(center)
                setZoom(zoom)
            }}>
                <Marker anchor={center} width={60} color={color} onClick={() => setHue(hue + 20)} />
                {pigeons.pigeons.map((pigeon) => (
                    <Overlay anchor={[pigeon.lat, pigeons.lng]}>
                        <figure>
                            <img src={pigeon_image} alt="" width={50} height={50}></img>
                            <figcaption>
                                {pigeon.name}</figcaption>
                        </figure>
                    </Overlay>
                ))}
                <ZoomControl />
                {cities.map((city) => (
                    <Marker anchor={[parseFloat(city.lat), parseFloat(city.lng)]} onClick={(payload) => alert(`city: ${city.city}-population: ${city.population}-country:${city.country}`)} />))}
            </Map>
        </>
    )
};
export default MyMap;