// --------------------------  Modal -------------------------- //
var modal = document.getElementById("myModal");
var btn = document.getElementById("forecastButton");
var span = document.getElementsByClassName("close")[0];
var selectedCity;

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};

// --------------------------  Modal -------------------------- //
// ------------------------  Fetch API ------------------------ //
function display(city) {
  document.querySelector(".search-bar").value = city;
  selectedCity = city;
}

function fetchWeather() {
  const opeanweathermapApiKEY = "713f964a0a59c33b670434c772385769";
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      selectedCity +
      "&units=metric&appid=" +
      opeanweathermapApiKEY
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => displayWeather(data));
}

function displayWeather(data) {
  console.log("Displaying: " + data.city.name);
  console.log(data);
  let cityName = selectedCity.replace(/\s/g, "").toLowerCase();
  document.getElementsByClassName(
    "modal-main"
  )[0].style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${cityName}')`;
  for (let i = 0; i < 5; i++) {
    const { icon, description } = data.list[i].weather[0];
    const { temp, humidity } = data.list[i].main;
    const { speed } = data.list[i].wind;
    document.querySelector(".weathericon_" + i).src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.getElementsByClassName("detail temperature_" + i)[0].innerText =
      temp + "°C";
    document.getElementsByClassName("detail humidity_" + i)[0].innerText =
      "Humidity: " + humidity + "%";
    document.getElementsByClassName("detail wind_" + i)[0].innerText =
      "Wind speed: " + speed + " km/h";
    document.getElementsByClassName("detail description_" + i)[0].innerText =
      description;
  }
}
// ------------------------  Fetch API ------------------------ //
// -------------------  Display Weather Card ------------------ //
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
var d = new Date();
var nextDate = new Date(d);
for (let i = 0; i < 5; i++) {
  nextDate.setDate(d.getDate() + i);
  document.getElementsByClassName(`weekday weekday_` + i)[0].innerHTML =
    weekday[nextDate.getDay()];
  document.getElementsByClassName(`dates dates_` + i)[0].innerHTML =
    months[nextDate.getMonth()] + " " + nextDate.getDate();
}
// -------------------  Display Weather Card ------------------ //
