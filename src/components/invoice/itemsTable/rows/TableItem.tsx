import styled from "styled-components"
import { Button } from "../../../UI/Button"
import { Input } from "../../../UI/Input"
import { Item, TInvoice } from "../../../../types/Invoice"
import { ChangeEvent } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { printModeRecoilState } from "../../../../state/PrintMode"
import { currencyRecoilState } from "../../../../state/Currency"
import { invoiceRecoilState } from "../../../../state/Invoice"
import { LocalStorageService } from "../../../../services/LocalStorageService"

const Container = styled.div<{ backgroundColor: string }>`
    display: flex;
    background-color: ${props => props.backgroundColor};
    align-items: center;
    border-bottom: 1px solid #ddd;
`
const RowItem = styled.div<{ flex?: number, align?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
`
const InputController = styled.div` 
`

type Props = {
    item: Item,
    index: number,
}

const LocalStorage = new LocalStorageService()

export const TableItem = ({ item, index }: Props) => {
    const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)
    const printMode = useRecoilValue(printModeRecoilState)
    const { symbol } = useRecoilValue(currencyRecoilState)
    const backgroundColor = index % 2 === 1 ? '#FFF' : '#f9f9f9'

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

    // Remove Item from Invoice
    const handleRemoveItem = (index: number) => {
        let newItems = [...invoiceState.items]
        newItems.splice(index, 1)

        saveInvoice({
            ...invoiceState,
            items: newItems
        })
    }

    // Set new Invoice and update state
    const saveInvoice = (newInvoice: TInvoice) => {
        setInvoiceState(newInvoice)
        LocalStorage.setInvoice(newInvoice)
    }

    return (
        <Container backgroundColor={backgroundColor}>
            <RowItem style={{ width: '36px' }}>
                {
                    !printMode &&
                    <Button color="red" onClick={() => handleRemoveItem(index)}>
                        [X]
                    </Button>
                }
            </RowItem>
            <RowItem flex={6}>
                <InputController style={{ maxWidth: '187px' }}>
                    <Input
                        name="description"
                        type="text"
                        onChange={(e) => handleChangeItem(e, index)}
                        value={item.description}
                        placeholder="Description"
                    />
                </InputController>
            </RowItem>
            <RowItem flex={2}>
                <InputController style={{ maxWidth: '57px' }}>
                    <Input
                        name="qty"
                        type="number"
                        onChange={(e) => handleChangeItem(e, index)}
                        value={item.qty}
                    />
                </InputController>
            </RowItem>
            <RowItem flex={2}>
                <InputController style={{ maxWidth: '73px' }}>
                    <Input
                        name="cost"
                        type="number"
                        onChange={(e) => handleChangeItem(e, index)}
                        value={item.cost}
                    />
                </InputController>
            </RowItem>
            <RowItem flex={2} align="right" >{symbol}{(item.qty * item.cost).toFixed(2)}</RowItem>
        </Container>
    )
}