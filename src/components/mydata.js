import React, { useEffect, useState } from "react";
// import data1 from "./mydetails.json";
const CountryData = (MyCountryinfo) => {
    return (
        <>
            {console.log(MyCountryinfo)}
            <h1>Country Data:</h1>
            <h1>
                Capital: {MyCountryinfo[0].capital[0]}
            </h1>
        </>
    );
};

const Mylocation = (Myinfo) => {
    return (
        <>
            <h1>What Is My IP:</h1>
            <h1>
                My Public IPv4 is: {Myinfo.ip}
            </h1>
            <h1>My IP Location is:{Myinfo.location.country} {Myinfo.location.region}</h1>
            <h1>ISP: {Myinfo.isp}</h1>
        </>
    );
};
const MyData = () => {
    const API = "https://geo.ipify.org/api/v2/country?apiKey=at_DUdVqPuRpqO1beFHfnqU5fQAbe2Av";
    const countriesapi = (code) => `https://restcountries.com/v3.1/alpha/${code}`;
    const [Myinfo, setInfo] = useState();
    const [MyCountryinfo, setCountry] = useState();
    const getIPData = () => {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                setInfo(Mylocation(data));
                return data;
            })
            .then(json => {
                fetch(countriesapi(json.location.country))
                    .then(response => response.json())
                    .then(json => setCountry(CountryData(json)))
            })
    }
    useEffect(() => {
        getIPData()
        // const timer = setInterval(getData, 2000); // instead of executing the function once, we can set up an interval that will call it periodically. React will update our page each time new data gets loaded!
        // return () => clearInterval(timer) // if the hook returns a function, it will be called when our component is removed from the page. This is usefull for clearing event handler or intervals which could otherwise cause issues
    }, []);

    return (
        <>
            {Myinfo}
            {MyCountryinfo}
        </>
    );
}
export default MyData;