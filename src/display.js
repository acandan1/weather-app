/* eslint-disable no-else-return */
/* eslint-disable no-dupe-else-if */
import City from './collect';
import getCityObject from './collect';

const container = document.getElementsByClassName("container")[0];

export default function eventHandler(cityObject) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    displaySearchBox();
    displayBasicInformation(cityObject);
    displayDetailedInformation(cityObject);
}

function chooseImage(description) {
    if (description.includes("cloud")) {
        return "../src/icons/brokenclouds.svg";
    } else if (description.includes("sky")){
        return "../src/icons/sun.svg";
    } else if (description.includes("snow")){
        return "../src/icons/snow.svg";
    } else if (description.includes("rain")){
        return "../src/icons/showerrain.svg";
    } else if (description.includes("drizzle")){
        return "../src/icons/rain.svg";
    } else if (description.includes("thunderstorm")){
        return "../src/icons/thunderstorm.svg";
    } else {
        return "../src/icons/mist.svg";
    }
}

function displaySearchBox() {
    const div = document.createElement("div");
    div.className = "content";
    div.id = "search-box";

    const input = document.createElement("input");
    input.id = "search-input";
    input.placeholder = "Search Location...";
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getCityObject(input.value).then(result => eventHandler(result));
        }
    })
    div.appendChild(input);


    container.appendChild(div);
}

function displayBasicInformation(cityObject) {
    // City name, Local date, Local time, current temp, weather description
    const div = document.createElement("div");
    div.className = "content";
    div.id = "basic-information";

    const img = document.createElement("img");
    img.id = "description-image";
    img.className = "icons";
    img.src = chooseImage(cityObject.weather[0].description);
    div.appendChild(img);

    const h1 = document.createElement("h1");
    h1.id = "name";
    h1.innerHTML = cityObject.name;
    div.appendChild(h1);

    const date = document.createElement("h3");
    date.id = "date";
    const cityDate = `${cityObject.dt[0]} ${cityObject.dt[1]} ${cityObject.dt[2]} ${cityObject.dt[3]}`;
    date.innerHTML = cityDate;
    div.appendChild(date);

    const time = document.createElement("h3");
    time.id = "time";
    let cityTime = cityObject.dt[4].split(":");
    cityTime = `${cityTime[0]}:${cityTime[1]}`;
    time.innerHTML = cityTime;
    div.appendChild(time);

    const temp = document.createElement("h3");
    temp.id = "temp";
    let tempSimplified = cityObject.main.temp.toString().split(".");
    tempSimplified = tempSimplified[0];
    temp.innerHTML = `${tempSimplified} °C`;
    div.appendChild(temp);

    const weatherDescription = document.createElement("h3");
    weatherDescription.id = "weather-description";
    weatherDescription.innerHTML = cityObject.weather[0].description;
    div.appendChild(weatherDescription);
    
    container.appendChild(div);
}

function displayDetailedInformation(cityObject) {
    /* 4 different divs with images:
    Feels like, Humidity, Chance of Rain, Wind Speed
     */
    const div = document.createElement("div");
    div.className = "content";
    div.id = "detailed-information";

    // Feels Like div
    const feelsDiv = document.createElement("div");
    feelsDiv.className = "right-info";
    feelsDiv.id = "feels-like";
    const img1 = document.createElement("img");
    img1.className = "icons right";
    img1.src = '../src/icons/temperature.svg';
    feelsDiv.appendChild(img1);
    const fName = document.createElement("h2");
    fName.id = "f-name";
    fName.innerHTML = `Feels Like`;
    feelsDiv.appendChild(fName);
    const fDesc = document.createElement("h3");
    let tempSimplified = cityObject.main.feels_like.toString().split(".");
    tempSimplified = tempSimplified[0];
    fDesc.innerHTML = `${tempSimplified} °C`;
    fDesc.className = "infos";
    feelsDiv.appendChild(fDesc);
    div.appendChild(feelsDiv);
    // -----------------------

    // Feels Like div
    const humidityDiv = document.createElement("div");
    humidityDiv.className = "right-info";
    humidityDiv.id = "humidity";
    const img2 = document.createElement("img");
    img2.className = "icons right";
    img2.src = '../src/icons/humidity.svg';
    humidityDiv.appendChild(img2);
    const hName = document.createElement("h2");
    hName.id = "h-name";
    hName.innerHTML = `Humidity`;
    humidityDiv.appendChild(hName);
    const hDesc = document.createElement("h3");
    hDesc.innerHTML = `${cityObject.main.humidity} %`;
    hDesc.className = "infos";
    humidityDiv.appendChild(hDesc);
    div.appendChild(humidityDiv);
    // -----------------------

    // Feels Like div
    const windDiv = document.createElement("div");
    windDiv.className = "right-info";
    windDiv.id = "wind";
    const img3 = document.createElement("img");
    img3.className = "icons right";
    img3.src = '../src/icons/windspeed.svg';
    windDiv.appendChild(img3);
    const wName = document.createElement("h2");
    wName.id = "w-name";
    wName.innerHTML = `Wind Speed`;
    windDiv.appendChild(wName);
    const wDesc = document.createElement("h3");
    wDesc.innerHTML = `${cityObject.wspeed} m/s`;
    wDesc.className = "infos";
    windDiv.appendChild(wDesc);
    div.appendChild(windDiv);
    // ----------------------

    container.appendChild(div);
}