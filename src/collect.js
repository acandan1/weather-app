// API KEY: 61f262f1468481ea2fbd8b536baecc82
// Collect data from: https://api.openweathermap.org/data/2.5/weather?q=CityName&APPID=61f262f1468481ea2fbd8b536baecc82
// https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=61f262f1468481ea2fbd8b536baecc82

class City {
    constructor(name, dt, main, weather, timezone, wspeed, list) {
        this.name = name;
        this.dt = new Date(dt * 1000 + 1000 * timezone).toUTCString().split(" ");
        this.main = main;
        this.weather = weather;
        this.timezone = timezone;
        this.wspeed = wspeed;
        this.list = list;
    }
}

async function getData(latitude, longitude, array) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=61f262f1468481ea2fbd8b536baecc82`;
        const fetchData = await fetch(url);
        const convertData = await fetchData.json();
        // get the list
        const list = convertData.list;
        // Create object
        const city = new City(array[0], array[1], array[2], array[3], array[4], array[5], list);
        return city;
    } catch (error) {
        console.log(error);
    }
}

export default async function getCityObject(cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=61f262f1468481ea2fbd8b536baecc82`;
        const fetchData = await fetch(url);
        const convertData = await fetchData.json();
        const latitude = convertData.coord.lat;
        const longitude = convertData.coord.lon; 
        console.log(convertData);
    
        // Data for the object
        const currentName = convertData.name;
        const currentDT = convertData.dt;
        const currentMain = convertData.main;
        const currentWeather = convertData.weather;
        const currentTimezone = convertData.timezone;
        const currentWindSpeed = convertData.wind.speed;
        const array = [currentName, currentDT, currentMain, currentWeather, currentTimezone, currentWindSpeed];
    
        return getData(latitude, longitude, array);
    } catch (error) {
        console.log("COULDNT FIND CITY");
    }
}