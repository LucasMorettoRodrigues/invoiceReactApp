import { ChangeEvent, useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import { LocalStorageService } from "../../../services/LocalStorageService"
import { invoiceRecoilState } from "../../../state/Invoice"
import { logoRecoilState } from "../../../state/Logo"
import { printModeRecoilState } from "../../../state/PrintMode"
import { TInvoice } from "../../../types/Invoice"
import { editInvoice } from "../../../utils/Functions"
import { Input } from "../../UI/Input"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 2em;
`
const InnerContainer = styled.div`
  padding: 0 15px;
`
const Image = styled.img`
    width: 300px;
    vertical-align: middle;
`
const ButtonsContainer = styled.div`
    text-align: right;
`
const Button = styled.button`
    padding: 0;
    margin-left: 4px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #428bca;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        border-bottom: 1px solid #356ea0;
        color: #356ea0;
    }

    &:focus {
        border-bottom: 1px solid #356ea0;
        color: #356ea0;
    }
`

const LocalStorage = new LocalStorageService()

export const Branding = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    const [logoRemoved, setLogoRemoved] = useState(false)
    const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)
    const [logoState, setLogoState] = useRecoilState(logoRecoilState)
    const printMode = useRecoilValue(printModeRecoilState)

    // Triggers the logo chooser click event
    const handleEditLogo = () => {
        inputRef.current && inputRef.current.click()
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

    // Update Invoice
    const handleChangeInvoice = (e: ChangeEvent<HTMLInputElement>) => {
        const newInvoice = editInvoice(e, invoiceState)
        saveInvoice(newInvoice)
    }

    // Set new Invoice and update state
    const saveInvoice = (newInvoice: TInvoice) => {
        setInvoiceState(newInvoice)
        LocalStorage.setInvoice(newInvoice)
    }

    return (
        <Container>
            <InnerContainer>
                <Input
                    autoFocus={true}
                    label='Invoice #'
                    type='text'
                    name='invoice_number'
                    fontWeight='bold'
                    onChange={(e) => handleChangeInvoice(e)}
                    value={invoiceState.invoice_number}
                />
            </InnerContainer>
            <InnerContainer>
                <input onChange={readUrl} ref={inputRef} style={{ display: 'none' }} type="file" id="imgInp" />
                {
                    !logoRemoved &&
                    <Image ref={imgRef} src={logoState} alt="your image" />
                }
                {
                    !printMode &&
                    <ButtonsContainer>
                        <Button onClick={handleEditLogo}>Edit Logo</Button>
                        <Button onClick={() => setLogoRemoved(!logoRemoved)}>
                            {logoRemoved ? 'Show logo' : 'Hide logo'}
                        </Button>
                    </ButtonsContainer>
                }
            </InnerContainer>
        </Container>
    )
}