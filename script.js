function getUrl(type, searchQuery) {
    if (type == "weather") {
        const location = searchQuery;
        const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location.toLowerCase() + "?key=AG7GMXU4EJGMMMJ7ZM74KJ4GB";
        return url;
    }

    if (type == "giphy") {
        const gif = searchQuery;
        const url = "https://api.giphy.com/v1/gifs/translate?api_key=DVNRz1CLadpeh4Xa3H0DAxrBeLdGsDaq&s=" + gif.toLowerCase();
        return url;
    }
}

function getResponse(url) {
    return fetch(url, {
        mode: 'cors'
    })
        .then(function (response) {
            return response.json(); //process response
        })
        .then(function (data) {
            return data; // return the processed data
        })
        .catch(function (err) {
            console.log("ERROR"); // handle error
        });
}

function displayWeather(weatherData) {
    const container = document.querySelector("#container");
    const tempDiv = document.createElement("div");
    tempDiv.textContent = weatherData.currentConditions.temp;
    const conditionDiv = document.createElement("div");
    const conditionImg = document.createElement("img");
    conditionDiv.textContent = weatherData.currentConditions.conditions;
    const conditionIcon = weatherData.currentConditions.icon;
    const conditionIconFiltered = conditionIcon.replace(/-/g, "").toLowerCase() // remove all hyphens and send to lower case (just in case)
    const typeGiphy = "giphy";
    const urlGiphy = getUrl(typeGiphy, conditionIconFiltered);
    getResponse(urlGiphy)
        .then((data) => {
            conditionImg.src = data.data.images.original.url;
        })
    conditionDiv.appendChild(conditionImg);
    container.appendChild(tempDiv);
    container.appendChild(conditionDiv);
}

const formContainer = document.querySelector("#formContainer");
const locationBtn = document.querySelector("#locationBtn");
locationBtn.addEventListener("click", () => {
    if (formContainer.children.length == 0) {
        const newForm = document.createElement("form");
        const label = document.createElement("label");
        label.setAttribute("for", "location");
        label.textContent = "Location";
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "location")
        input.setAttribute("name", "location");
        input.setAttribute("placeholder", "London");
        newForm.appendChild(label);
        newForm.appendChild(input);

        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Enter Location");
        newForm.appendChild(submitBtn);

        formContainer.appendChild(newForm);
        newForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const userLocation = input.value;
            const typeWeather = "weather";
            const urlWeather = getUrl(typeWeather, userLocation);
            let weatherData = "";
            getResponse(urlWeather)
                .then((data) => {
                    weatherData = data;
                    displayWeather(weatherData);
                });
            this.remove();
        })
    }
})

