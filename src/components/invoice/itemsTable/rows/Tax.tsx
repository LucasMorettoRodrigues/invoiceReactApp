import { ChangeEvent } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import { LocalStorageService } from "../../../../services/LocalStorageService"
import { currencyRecoilState } from "../../../../state/Currency"
import { invoiceRecoilState } from "../../../../state/Invoice"
import { TInvoice } from "../../../../types/Invoice"
import { calculateTax, editInvoice } from "../../../../utils/Functions"
import { Input } from "../../../UI/Input"

const Container = styled.div<{ backgroundColor: string }>`
    display: flex;
    background-color: ${props => props.backgroundColor};
`
const RowItem = styled.div<{ flex?: number, align?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
    border-bottom: 1px solid #ddd;
`
const InputController = styled.div`
    max-width: 43px;
    margin-left: 5px;
`

const LocalStorage = new LocalStorageService()

export const Tax = () => {
    const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)
    const { symbol } = useRecoilValue(currencyRecoilState)
    const backgroundColor = invoiceState.items.length % 2 === 1 ? '#FFF' : '#f9f9f9'

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
        <Container backgroundColor={backgroundColor}>
            <RowItem flex={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                Tax(%):
                <InputController>
                    <Input
                        onChange={(e) => handleChangeInvoice(e)}
                        name='tax'
                        value={invoiceState.tax}
                        type='number'
                    />
                </InputController>
            </RowItem>
            <RowItem flex={1} align="right">
                {symbol}{calculateTax(invoiceState).toFixed(2)}
            </RowItem>
        </Container>
    )
}