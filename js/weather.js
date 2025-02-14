const KEY = "b08332c778fcad97cc7aa0a56e974241";

const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric`;

let latitud = 35.671174;
let longitud = 139.774497;

const weatherInput = document.querySelector("#weather-search");

const weatherBtnSave = document.getElementById("weather-save"); 

let ultimaCiudadValida;

const ciudadGuardada = localStorage.getItem("clima-ciudad");

if(ciudadGuardada) {

    obtenerClimaPorNombreCiudad(ciudadGuardada);

} else {

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const coords = position.coords;
                latitud = coords.latitude;
                longitud = coords.longitude;
                obtenerClimaPorCoordenadas(latitud, longitud);

            }, // successCallback
            (error) => {
                console.log("Error al obtener la ubicación");
                obtenerClimaPorCoordenadas(latitud, longitud);
            } // errorCallback
        )

    }

    
}


function obtenerClimaPorCoordenadas(LATI, LONG) {

    axios.get(`${baseURL}&lat=${LATI}&lon=${LONG}`)   // Japón 35.671174, 139.774497
        .then(response => {
            console.log(response.data);
            const weather = response.data;

            pintarClima(weather);
        })
        .catch(errorsito => {
            console.log(errorsito);	
        })

} // IIFE para invocar inmediatamente la función


weatherInput.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        
        const valorInput = event.target.value.toLowerCase();
        
        obtenerClimaPorNombreCiudad(valorInput);

    } 
})

// weatherInput.addEventListener("input", function(event) {
//     weatherBtnSave.disabled = true;
// })

weatherBtnSave.addEventListener("click", function() {

    // const ciudad = weatherInput.value.toLowerCase();

    localStorage.setItem("clima-ciudad", ultimaCiudadValida);

    Swal.fire({
        title: "Ciudad guardada",
        text: `Se guardó la ciudad de ${ultimaCiudadValida}`,
        icon: "info"
    })

    // obtenerClimaPorNombreCiudad(ciudad, 123);
});








function obtenerClimaPorNombreCiudad(ciudad, save = false) {
    
    axios.get(`${baseURL}&q=${ciudad}`)
                .then(response => {
                    const weather = response.data;
                    pintarClima(weather);

                    weatherBtnSave.disabled = false;
                    // weatherBtnSave.classList.remove("disabled");

                    ultimaCiudadValida = ciudad;


                    Swal.fire({
                        title: "Ciudad encontrada",
                        text: `Se encontró la ciudad de ${ciudad}`,
                        icon: "success"
                    })

                    // if(save) {
                    //     // Guardar el nombre de la ciudad en el localStorage
                    //     localStorage.setItem("clima-ciudad", ciudad);
                    // }
                })
                .catch(error => {
                    console.log(error);
                    weatherBtnSave.disabled = true;
                    Swal.fire({
                        title: "Ciudad no encontrada",
                        text: `No se encontró la ciudad de ${ciudad}`,
                        icon: "error"
                    })
                })

}


// obtenerClima();

function pintarClima(clima) {

    const weatherTempHTML = document.getElementById("weather-temp");
    const weatherLocationHTML = document.getElementById("weather-location");
    const weatherIconHTML = document.getElementById("weather-icon");

    weatherTempHTML.innerText = clima.main.temp;

    weatherLocationHTML.innerText = clima.name;

    const icon = clima.weather[0].icon;

    const img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.alt = "Icono del clima";

    weatherIconHTML.innerHTML = "";

    weatherIconHTML.appendChild(img);

}
