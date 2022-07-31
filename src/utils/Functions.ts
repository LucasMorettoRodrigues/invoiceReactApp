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