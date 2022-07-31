import { ChangeEvent } from 'react';
import { CurrencyService } from '../services/CurrencyService';
import { TInvoice } from '../types/Invoice'

// Calculates the sub total of the invoice
export const invoiceSubTotal = (invoice: TInvoice) => {
    let total = 0.00;
    invoice.items.forEach(item => {
        total += (item.qty * item.cost * (100 - item.discount) / 100);
    });
    return total;
};

// Calculates the tax of the invoice
export const calculateTax = (invoice: TInvoice) => {
    return ((invoice.tax * invoiceSubTotal(invoice)) / 100);
};

// Calculates the grand total of the invoice
export const calculateGrandTotal = (invoice: TInvoice) => {
    return calculateTax(invoice) + invoiceSubTotal(invoice);
};

// Open print dialog
export const printInfo = () => {
    window.print();
};

// Convert Values to New Currency
export const convertValues = async (invoice: TInvoice, formerCurrencyCode: string, newCurrencyCode: string) => {
    const conversionRate = await new CurrencyService()
        .getConversionRate(formerCurrencyCode, newCurrencyCode)

    if (!conversionRate) {
        alert('Sorry, it was not possible to convert.')
        return
    }

    const newInvoice = {
        ...invoice,
        items: invoice.items.map(item => (
            {
                ...item,
                cost: Math.round(item.cost * conversionRate * 100) / 100
            }
        ))
    }

    return newInvoice
}

// Update Invoice
export const editInvoice = (e: ChangeEvent<HTMLInputElement>, invoice: TInvoice, key?: keyof TInvoice) => {
    let editedInvoice = invoice

    if (key === 'customer_info' || key === 'company_info') {
        editedInvoice = {
            ...invoice,
            [key]: {
                ...invoice[key],
                [e.target.name]: e.target.value
            }
        }

        return editedInvoice
    }

    editedInvoice = {
        ...invoice,
        [e.target.name]: e.target.value
    }

    return editedInvoice
}