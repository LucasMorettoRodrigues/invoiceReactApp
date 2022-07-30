import styled from "styled-components"
import { Button } from "../../../UI/Button"
import { Input } from "../../../UI/Input"
import { Item } from "../../../../types/Invoice"
import { ChangeEvent } from "react"

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
    handleRemoveItem: (index: number) => void,
    index: number,
    handleOnChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void,
    printMode: boolean
    currencySymbol: string,
    backgroundColor: string
}

export const TableItem = ({ item, index, handleRemoveItem, handleOnChange, printMode, currencySymbol, backgroundColor }: Props) => {

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
                        onChange={(e) => handleOnChange(e, index)}
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
                        onChange={(e) => handleOnChange(e, index)}
                        value={item.qty}
                    />
                </InputController>
            </RowItem>
            <RowItem flex={2}>
                <InputController style={{ maxWidth: '73px' }}>
                    <Input
                        name="cost"
                        type="number"
                        onChange={(e) => handleOnChange(e, index)}
                        value={item.cost}
                    />
                </InputController>
            </RowItem>
            <RowItem flex={2} align="right" >{currencySymbol}{(item.qty * item.cost).toFixed(2)}</RowItem>
        </Container>
    )
}