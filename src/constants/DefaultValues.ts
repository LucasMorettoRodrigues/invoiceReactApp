// The invoice displayed when the user first uses the app
export const DEFAULT_INVOICE = {
    tax: 13.00,
    invoice_number: 10,
    customer_info: {
        name: 'Mr. John Doe',
        web_link: 'John Doe Designs Inc.',
        address1: '1 Infinite Loop',
        address2: 'Cupertino, California, US',
        postal: '90210'
    },
    company_info: {
        name: 'Metaware Labs',
        web_link: 'www.metawarelabs.com',
        address1: '123 Yonge Street',
        address2: 'Toronto, ON, Canada',
        postal: 'M5S 1B6'
    },
    items: [
        { qty: 10, description: 'Gadget', cost: 9.95 }
    ]
}

// The default currency for the invoice
export const DEFAULT_CURRENCY = { name: 'US Dollar ($)', symbol: '$' }

// The default logo for the invoice
export const DEFAULT_LOGO = 'images/metaware_logo.png'

