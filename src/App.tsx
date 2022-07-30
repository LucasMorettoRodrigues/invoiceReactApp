import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_CURRENCY, DEFAULT_INVOICE, DEFAULT_LOGO } from './constants/DefaultValues';
import { LocalStorageService } from './services/LocalStorageService';

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
                <ItemsTable />
                <Actions />
            </InvoiceContainer>
            <Footer />
        </>
    );
}