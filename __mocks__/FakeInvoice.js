export const fakeInvoice = {
    tax: 10.00,
    invoice_number: 1,
    customer_info: {
        name: 'Fake Name',
        web_link: 'Fake Link',
        address1: 'Fake Address 1',
        address2: 'Fake Address 2',
        postal: 'Fake Postal'
    },
    company_info: {
        name: 'Company Fake Name',
        web_link: 'Company Fake Link',
        address1: 'Company Fake Address 1',
        address2: 'Company Fake Address 2',
        postal: 'Company Fake Postal'
    },
    items: [
        { qty: 2, description: 'Fake Item 1', cost: 5.00, discount: 10 },
        { qty: 2, description: 'Fake Item 2', cost: 10.00, discount: 10 }
    ]
}