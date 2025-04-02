# currency-converter
    this is the code to convert one currency to another 
# Exchange rate api
    api_url = "https://api.exchangerate-api.com/v4/latest/USD"
    response = requests.get(api_url)
    data = response.json()
# get the exchange rate of the currency we want to convert to
    exchange_rate = data["rates"][currency]
# convert the amount to the desired currency
    converted_amount = amount * exchange_rate
