const apiKey = "415f10a4eea241dc9e8180524252606";
const detect =document.querySelector("#detect");
const input = document.querySelector("#inp");
 const button = document.querySelector("#search");
const city = document.querySelector(".cityN");
const temp = document.querySelector(".temp")
const weather = document.querySelector(".weather")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const img = document.querySelector("#img")
const time= document.querySelector(".time");

 const inputVal=()=>{
let cityVal = input.value ; 
if(cityVal !==""){
 updateData(cityVal)
}
 }
const suggestionBox = document.querySelector("#suggestions");

// suggestion

input.addEventListener("input", async () => {
  const query = input.value.trim();
  if (query.length < 2) {
    suggestionBox.innerHTML = "";
    return;
  }

  try {
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
    const res = await fetch(url);
    const results = await res.json();

    suggestionBox.innerHTML = "";
    results.forEach(cityObj => {
      const div = document.createElement("div");
      div.textContent = `${cityObj.name}, ${cityObj.region}, ${cityObj.country}`;
      div.addEventListener("click", () => {
        input.value = cityObj.name;
        suggestionBox.innerHTML = "";
        updateData(cityObj.name);
      });
      suggestionBox.appendChild(div);
    });
  } catch (err) {
    console.log("Error fetching suggestions:", err);
  }
});

 detect.addEventListener("click",()=>{
   
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,error);
    }
    else{
        alert("Geolocation is not supported by your browser");
    }

 });
// position
const showPosition=async(position)=>{
 const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  try {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    console.log(URL)
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    const cityName = data.location.name ; 
    input.value= cityName ;
    updateUI(data);
  }
   catch (err) {
    alert("Unable to fetch weather from location.");
    console.log(err);
  }
}


const error = (err) => {
  alert("Location access denied or unavailable.");
  console.error(err);
};


  button.addEventListener("click",inputVal);
  const updateData=async(cityVal)=>{
try{const URL= `https://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${cityVal}&aqi=no`;
let response = await fetch(URL);
if (!response.ok){
    throw new Error("Invalid City name")
}
let data = await response.json(); 
updateUI(data);
}catch(err) {
  alert("Please enter a valid city");
  console.log("Error:", err); 
}

  }
  const updateUI=(data)=>{
    city.textContent = `City Name :${data.location.name}` ;
 temp.textContent= `Temp : ${data.current.temp_c}°C` ; 
 weather.textContent=`Weather: ${data.current.condition.text}` ;
 humidity.textContent=`Humidity: ${data.current.humidity}%` ;
 wind.textContent=`Wind Speed: ${data.current.wind_kph} km/hr`;
img.src = `https:${data.current.condition.icon}`;
time.textContent=`Time:${data.location.localtime.split(" ")[1]}` ;
  }