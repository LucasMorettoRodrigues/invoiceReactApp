import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_CURRENCY, DEFAULT_INVOICE } from './constants/DefaultValues';
import { LocalStorageService } from './services/LocalStorageService';
import DEFAULT_LOGO from './images/metaware_logo.png'

// Components
import { Actions } from './components/invoice/actions/Actions';
import { Branding } from './components/invoice/branding/Branding';
import { Header } from './components/invoice/header/Header';
import { Infos } from './components/invoice/infos/Infos';
import { ItemsTable } from './components/invoice/itemsTable/ItemsTable';
import { Footer } from './components/layout/Footer';
import { TInvoice } from './types/Invoice';
import { CurrencyService } from './services/CurrencyService';

const InvoiceContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 750px;
  }

  @media (min-width: 992px) {
    max-width: 970px;
  }
`
const LocalStorage = new LocalStorageService()
const currencies = new CurrencyService().all()

export const App = () => {

    const [invoiceState, setInvoiceState] = useState(DEFAULT_INVOICE)
    const [logoState, setLogoState] = useState(DEFAULT_LOGO)
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY)
    const [printMode, setPrintMode] = useState(false)

    useEffect(() => {
        (function init() {
            // Attempt to load invoice from local storage
            if (LocalStorage.hasInvoice()) {
                setInvoiceState(LocalStorage.getInvoice())
            }

            // Attempt to load logo from local storage
            if (LocalStorage.hasLogo()) {
                setLogoState(LocalStorage.getLogo())
            }
        })()
    }, [])

    // Update Invoice
    const handleChangeInvoice = (e: ChangeEvent<HTMLInputElement>, key?: keyof TInvoice) => {
        if (key === 'customer_info' || key === 'company_info') {
            saveInvoice({
                ...invoiceState,
                [key]: {
                    ...invoiceState[key],
                    [e.target.name]: e.target.value
                }
            })
            return
        }

        saveInvoice({
            ...invoiceState,
            [e.target.name]: e.target.value
        })
    }

    // Update Invoice's Item
    const handleChangeItem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newItem = { ...invoiceState.items[index], [e.target.name]: e.target.value }

        saveInvoice({
            ...invoiceState,
            items: invoiceState.items.map((item, itemIndex) => (
                itemIndex === index
                    ? newItem
                    : item
            ))
        })
    }

    // Add new Item to Invoice
    const handleAddItem = () => {
        const newItem = { description: '', qty: 0, cost: 0 }

        saveInvoice({
            ...invoiceState,
            items: [...invoiceState.items, newItem]
        })
    }

    // Remove Item from Invoice
    const handleRemoveItem = (index: number) => {
        let newItems = [...invoiceState.items]
        newItems.splice(index, 1)

        saveInvoice({
            ...invoiceState,
            items: newItems
        })
    }

    // Reads a url and set new logo
    const readUrl = (input: ChangeEvent<HTMLInputElement>) => {
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e: any) {
                setLogoState(e.target.result)
                LocalStorage.setLogo(e.target.result);
            }
            reader.readAsDataURL(input.target.files[0]);
        }
    };

    // Set new Invoice and update state
    const saveInvoice = (newInvoice: TInvoice) => {
        setInvoiceState(newInvoice)
        LocalStorage.setInvoice(newInvoice)
    }

    // Handle Reset Invoice
    const handleReset = () => {
        const confirmClear = window.confirm('Are you sure you would like to clear the invoice?');
        if (confirmClear) {
            LocalStorage.clearLocalStorage()
            setLogoState(DEFAULT_LOGO)
            setInvoiceState(DEFAULT_INVOICE)
        }
    }

    return (
        <>
            <InvoiceContainer>
                <Header />
                <Branding
                    invoice={invoiceState}
                    handleChangeInvoice={handleChangeInvoice}
                    printMode={printMode}
                    logo={logoState}
                    readUrl={readUrl}
                />
                <Infos
                    invoice={invoiceState}
                    handleChangeInvoice={handleChangeInvoice}
                    currency={currency}
                    handleChangeCurrency={(currencyName) => setCurrency(currencies.find(i => i.name === currencyName)!)}
                    printMode={printMode}
                />
                <ItemsTable
                    invoice={invoiceState}
                    handleChangeInvoice={handleChangeInvoice}
                    handleChangeItem={handleChangeItem}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                    printMode={printMode}
                    currencySymbol={currency.symbol}
                />
                <Actions
                    handleReset={handleReset}
                    handlePrintMode={() => setPrintMode(!printMode)}
                    printMode={printMode}
                />
            </InvoiceContainer>
            <Footer
                printMode={printMode}
            />
        </>
    );
}