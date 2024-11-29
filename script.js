function getUrl(location) {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location.toLowerCase() + "?key=AG7GMXU4EJGMMMJ7ZM74KJ4GB";
    return url;
}

function getResponse(url) {
    return fetch(url, {
        mode: 'cors'
    })
        .then(function (response) {
            return response.json(); //process response
        })
        .then(function (data) {
            return data.currentConditions.temp; // use the processed data to get temp
        })
        .catch(function (err) {
            console.log("ERROR"); // handle error
        });
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
            const location = input.value;
            const url = getUrl(location);
            let temp = "";
            getResponse(url)
                .then((data) => {
                    temp = data;
                    console.log(temp)
                });
            this.remove();
        })
    }
})

