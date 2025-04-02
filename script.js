let BASE_URL = `https://api.exchangerate-api.com/v4/latest`;

let dropdowns = document.querySelectorAll("#dropdowns select");
let btn = document.querySelector("form button");
let fromCurrency = document.querySelector("#from select");
let toCurrency = document.querySelector("#to select");
let result = document.querySelector("#result");



for (select of dropdowns) {    // add options
    for (currencyCode in countryList) {
        let option = document.createElement("option");
        option.value = currencyCode;
        option.innerHTML = countryList[currencyCode];
        if (select.name === "from" && currencyCode === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && currencyCode === "PKR") {
            option.selected = "selected";
        }
        select.appendChild(option);
    }

    select.addEventListener("change", (e) => {
        upDateFlags(e.target);
    });
}

const upDateFlags = (element) => {    // update flags
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let flagImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = flagImg;
}

const updateExchangeRate = async () => {    // update exchange rate
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurrency.value];
  
    let finalAmount = amtVal * rate;
    result.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
  };

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});


