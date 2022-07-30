import { useEffect, useState } from 'react';
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

    return (
        <>
            <InvoiceContainer>
                <Header />
                <Branding />
                <Infos />
                <ItemsTable />
                <Actions />
            </InvoiceContainer>
            <Footer />
        </>
    );
}