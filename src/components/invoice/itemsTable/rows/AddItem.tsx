import { useRecoilState } from "recoil"
import styled from "styled-components"
import { LocalStorageService } from "../../../../services/LocalStorageService"
import { invoiceRecoilState } from "../../../../state/Invoice"
import { TInvoice } from "../../../../types/Invoice"
import { Button } from "../../../UI/Button"

const RowItem = styled.div<{ flex?: number, align?: string, backgroundColor: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.backgroundColor};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
    border-bottom: 1px solid #ddd;
`

const LocalStorage = new LocalStorageService()

export const AddItem = () => {

    const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)
    const backgroundColor = invoiceState.items.length % 2 === 1 ? '#FFF' : '#f9f9f9'

    // Add new Item to Invoice
    const handleAddItem = () => {
        const newItem = { description: '', qty: 0, cost: 0 }

        saveInvoice({
            ...invoiceState,
            items: [...invoiceState.items, newItem]
        })
    }

    // Set new Invoice and update state
    const saveInvoice = (newInvoice: TInvoice) => {
        setInvoiceState(newInvoice)
        LocalStorage.setInvoice(newInvoice)
    }

    return (
        <RowItem backgroundColor={backgroundColor}>
            <Button color="blue" onClick={handleAddItem}>[+]</Button>
        </RowItem>
    )
}