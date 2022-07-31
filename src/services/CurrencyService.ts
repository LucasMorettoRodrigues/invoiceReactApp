const KEY = 'a3f711bed1f6e8fe47c45225'
const ADDRESS = `https://v6.exchangerate-api.com/v6/${KEY}`

export class CurrencyService {
    all() {
        return [
            {
                name: 'British Pound (£)',
                symbol: '£',
                code: 'GBP'
            },
            {
                name: 'Canadian Dollar ($)',
                symbol: 'CAD $ ',
                code: 'CAD'
            },
            {
                name: 'Euro (€)',
                symbol: '€',
                code: 'EUR'
            },
            {
                name: 'Indian Rupee (₹)',
                symbol: '₹',
                code: 'INR'
            },
            {
                name: 'Norwegian krone (kr)',
                symbol: 'kr ',
                code: 'NOK'
            },
            {
                name: 'US Dollar ($)',
                symbol: '$',
                code: 'USD'
            }
        ]
    }

    async getConversionRate(currencyOne: string, currencyTwo: string) {
        try {
            let response = await fetch(
                `${ADDRESS}/pair/${currencyOne}/${currencyTwo}`
            ) as any
            response = await response.json()
            return response.conversion_rate
        } catch (error) {
            console.log(error)
        }
    }
}