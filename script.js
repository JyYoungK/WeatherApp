// --------------------------  Modal -------------------------- //
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("forecastButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// --------------------------  Modal -------------------------- //
// ------------------------  Fetch API ------------------------ //
function display(city) {
  document.querySelector(".search-bar").value = city;
  document.querySelector(".city").innerText = city;
  fetchWeather(city);
}

function fetchWeather(city) {
  const opeanweathermapApiKEY = "713f964a0a59c33b670434c772385769";
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
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
  console.log(data);
  let { name } = data.city.name;
  const { icon, description } = data.list[0].weather[0];
  const { temp, humidity } = data.list[0].main;
  const { speed } = data.list[0].wind;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";
}
// ------------------------  Fetch API ------------------------ //
