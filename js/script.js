// Dom Variables
let DataInDom = document.getElementById("DataInDom"),

    h4 = document.getElementsByTagName("h4")[0],

    hideBtn = document.getElementById("hideBtn"),

    // Data Variables    
    myRequest,

    myData,

    SecRequest,

    SecData,

    SecURL;

// Events
window.addEventListener("load", getData);

hideBtn.addEventListener("click", goHome);

/**************************************************************************************************/

// function to get first data
function getData() {

    myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            myData = JSON.parse(this.responseText)

            myData.forEach((item) => {

                DataInDom.innerHTML +=

                    `<a onclick='setCountryURL("${item.key}"); getName("${item.value}")'>${item.value}</a>`

            })

        }

    }

    myRequest.onerror = function () {
        throw "Request failed"
    }

    myRequest.open("GET", "https://date.nager.at/Api/v2/AvailableCountries", true);

    myRequest.send();

}

/**************************************************************************************************/

// function to set second url based on user choice "key"
function setCountryURL(key) {

    SecURL = `https://date.nager.at/api/v2/publicholidays/2021/${key}`

    secondGetData()

}

/**************************************************************************************************/

// function to save "country" user choice to display
function getName(str) {

    h4.innerHTML = `Holidays in: <strong>${str}</strong>`

}

/**************************************************************************************************/

// function to get second data based on user choice
function secondGetData() {

    SecRequest = new XMLHttpRequest();

    SecRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            SecData = JSON.parse(this.responseText)

            DataInDom.innerHTML = "";

            SecData.forEach((item) => {

                DataInDom.innerHTML +=

                `<div>
                <h3>Holiday:</h3>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Local Name:</strong> ${item.localName}</p></div>`

            })

        }

    }

    SecRequest.onerror = function () {
        throw "Request failed"
    }

    SecRequest.open("GET", SecURL, true);

    SecRequest.send();

    hideBtn.style.display = "block";

}

/**************************************************************************************************/

// function to leave result page and go to home page
function goHome() {
    
    location.reload(true)
    
}

/**************************************************************************************************/