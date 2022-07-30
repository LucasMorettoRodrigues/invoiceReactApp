import { ChangeEvent } from "react"
import styled from "styled-components"
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

type Props = {
    value: number,
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    tax: number,
    currencySymbol: string,
    backgroundColor: string
}

export const Tax = ({ value, handleOnChange, tax, currencySymbol, backgroundColor }: Props) => {

    return (
        <Container backgroundColor={backgroundColor}>
            <RowItem flex={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                Tax(%):
                <InputController>
                    <Input
                        onChange={(e) => handleOnChange(e)}
                        name='tax'
                        value={tax}
                        type='number'
                    />
                </InputController>
            </RowItem>
            <RowItem flex={1} align="right">
                {currencySymbol}{value.toFixed(2)}
            </RowItem>
        </Container>
    )
}