const arr = ["", "", ""];
let api = 'http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=delhi&aqi=no';
let locationAt = document.querySelector(".input-box");
const img_container = document.getElementsByClassName("image_container")[0];
const text_container = document.getElementsByClassName("weather_description")[0];
const temparature_conatiner = document.getElementsByClassName("temparature")[0];
const feelslike_conatiner = document.getElementsByClassName("feels_like")[0];
let current_location = "delhi";

function match() {
    img_container.innerHTML = "";
    text_container.innerHTML = "";
    temparature_conatiner.innerHTML = "";
    feelslike_conatiner.innerHTML = "";
    new_location = locationAt.value;
    const trim_location = new_location.trim();
    new_location = trim_location;
    if(new_location === ""){
        locationAt.value="";
        return;
    }
    let result = api.replace(current_location, new_location);
    current_location = new_location;
    api = result;
    locationAt.innerHTML = "";
    async function weather() {
        try {
            const ans = await fetch(api);
            const data = await ans.json();
            let location_name = data.location.name;
            const weather_data = data.current;
            arr[0] = weather_data.feelslike_c;
            const tempArr = weather_data.condition;
            arr[1] = tempArr.text;
            arr[2] = weather_data.temp_c;
            if (arr[1] === "Mist") {
                addElement(location_name, "images/snowy-6.svg");
            }
            else if (arr[1] === "Partly Cloudy") {
                addElement(location_name, "images/thunder.svg");
            }
            else if (arr[1] === "Sunny") {
                addElement(location_name, "images/cloudy-day-3.svg");
            }
            else if (arr[1] === "Clear") {
                addElement(location_name, "images/day.svg");
            }
            else {
                addElement(location_name, "images/day.svg");
            }
        }
        catch (err) {
            const textNode = document.createElement('p');
            textNode.textContent = "Please Enter Valid Location";
            text_container.appendChild(textNode);
        }
    }
    weather();
}

function addElement(location_name, weather_path) {
    locationAt.value = location_name;
    const weather_img = document.createElement("img");
    weather_img.src = weather_path;
    weather_img.style.width = '400px';
    img_container.appendChild(weather_img);
    const textNode = document.createElement('p');
    textNode.textContent = "Make The Most Of This Nice Weather That I generate For You. or else.";
    text_container.appendChild(textNode);
    const temparature = document.createElement('p');
    const temp = arr[2];
    temparature.textContent = temp + "º";
    temparature_conatiner.appendChild(temparature);
    const feelslike = document.createElement('p');
    const fel = arr[0];
    feelslike.textContent = "Feels " + fel + "º";
    feelslike_conatiner.appendChild(feelslike);
}