const functions = require('../../src/utils/Functions');

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

it('should calculate the invoice tax', () => {
    const subTotal = functions.invoiceSubTotal(fakeInvoice)
    expect(subTotal).toBe(27);
});

it('should calculate the invoice tax', () => {
    const tax = functions.calculateTax(fakeInvoice)
    expect(tax).toBe(2.7);
});

it('should calculate the invoice total', () => {
    const grandTotal = functions.calculateGrandTotal(fakeInvoice)
    expect(grandTotal).toBe(27 + 2.7);
});

it('should edit invoice when key is not provided', () => {
    const input = {
        target: {
            name: 'tax',
            value: 999
        }
    }

    const editedInvoice = functions.editInvoice(input, fakeInvoice)
    expect(editedInvoice.tax).toBe(999);
});

it('should edit invoice when key is provided', () => {
    const input = {
        target: {
            name: 'name',
            value: 'editedName'
        }
    }

    const editedInvoice = functions.editInvoice(input, fakeInvoice, 'customer_info')
    expect(editedInvoice.customer_info.name).toBe('editedName');
});

it('should return invoice with converted values', async () => {
    const editedInvoice = await functions.convertValues(fakeInvoice, 'USD', 'BRL')
    expect(typeof fakeInvoice).toBe(typeof editedInvoice)
});

it('should return invoice with converted values', async () => {
    const editedInvoice = await functions.convertValues(fakeInvoice, 'USD', 'notExistingCode')
    expect(typeof fakeInvoice).toBe(typeof editedInvoice)
});

