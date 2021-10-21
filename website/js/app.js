/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=fedf4384c03e6130b3fd1de93c0832b8'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();


let data = [];
// async function to make a GET request to the openweathermap using the zip code
const getWeather = async (event)=>{
  console.log(event)
  let zip = `${document.getElementById('zip').value},de`
  const units = '&units=metric'
  const res = await fetch(baseURL+zip+units+apiKey)
  try {
    data = await res.json();
    console.log(data);
  } catch(error) {
    console.log("error", error);
  }
}

// async function to make a POST request to store the API data and user input to the project data
const storeData = async (url = '', data = {})=>{
  const res = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
  try {
    console.log(data)
    console.log(res)
    const newData = await res.json();
    console.log(newData)
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

// async function to get all data stored in the projectData
const getData = async (url = '')=>{
  const res = await fetch(url)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// let zip = document.getElementById('zip').value
// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(event){
  getWeather(event).then(function(){
    console.log(data)
    storeData('/addData', { 
      temp: data.main.temp, 
      feels: data.main.feels_like,
      icon: data.weather[0].icon,
      desc: data.weather[0].description,
      name: data.name,
      date: newDate, 
      user: document.getElementById('feelings').value
    });
  })
  .then(function(){
    getData('all').then(function(result){
      const lastUserInput = result[result.length-1]
      document.getElementById('content').textContent = `Today you are feeling like this: ${lastUserInput.user}`
      // const img = document.createElement('img')
      // img.id = lastUserInput.icon
      // img.src= `url("http://openweathermap.org/img/wn/${lastUserInput.icon}@2x.png")`
      // img.width="200px"
      // img.height="200px"
      // document.getElementById('icon').appendChild = img
      document.getElementById('icon').style.backgroundImage = `url("http://openweathermap.org/img/wn/${lastUserInput.icon}@2x.png")`
      document.getElementById('desc').textContent = lastUserInput.desc
      document.getElementById('name').textContent = lastUserInput.name
      document.getElementById('temp').textContent = `Current temperature ${lastUserInput.temp}°C`
      document.getElementById('feels').textContent = `Feels like ${lastUserInput.feels}°C`
      document.getElementById('date').textContent = `Today is the ${lastUserInput.date}`
      console.log(result.length)
      console.log(result[result.length-1])
    })
  })
}
  