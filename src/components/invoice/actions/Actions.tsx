import { useRecoilState, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { DEFAULT_INVOICE, DEFAULT_LOGO } from "../../../constants/DefaultValues"
import { LocalStorageService } from "../../../services/LocalStorageService"
import { invoiceRecoilState } from "../../../state/Invoice"
import { logoRecoilState } from "../../../state/Logo"
import { printModeRecoilState } from "../../../state/PrintMode"
import { printInfo } from "../../../utils/Functions"
import { Button } from "../../UI/Button"

const Container = styled.div`
    display: flex;
    padding: 14px 0 0 0;

    @media print {
        display:none;
    }
`
const InputController = styled.div`
    margin-right: 3px;
`

const LocalStorage = new LocalStorageService()

export const Actions = () => {
    const [printMode, setPrintMode] = useRecoilState(printModeRecoilState)
    const setInvoiceState = useSetRecoilState(invoiceRecoilState)
    const setLogoState = useSetRecoilState(logoRecoilState)

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
        <Container>
            {
                printMode &&
                <InputController>
                    <Button color='blue' onClick={printInfo} >Print</Button>
                </InputController>
            }
            <InputController>
                <Button color='blue' onClick={handleReset} >Reset</Button>
            </InputController>
            <InputController>
                <Button color='blue' onClick={() => setPrintMode(!printMode)} >
                    Turn {printMode ? 'off' : 'on'} Print Mode
                </Button>
            </InputController>
        </Container>
    )
}