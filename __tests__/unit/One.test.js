const functions = require('../../src/utils/Functions');
const { fakeInvoice } = require('../../__mocks__/FakeInvoice')

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

it('should return false when currency code is invalid', async () => {
    const editedInvoice = await functions.convertValues(fakeInvoice, 'USD', 'invalidCode')
    expect(editedInvoice).toBe(false)
});

