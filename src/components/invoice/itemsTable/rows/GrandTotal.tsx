import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { currencyRecoilState } from "../../../../state/Currency"
import { invoiceRecoilState } from "../../../../state/Invoice"
import { calculateGrandTotal } from "../../../../utils/Functions"

const Container = styled.div<{ backgroundColor: string }>`
    display: flex;
    background-color: ${props => props.backgroundColor};
`
const RowItem = styled.div<{ flex?: number, align?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
`

export const GrandTotal = () => {
    const invoice = useRecoilValue(invoiceRecoilState)
    const { symbol } = useRecoilValue(currencyRecoilState)

    const total = calculateGrandTotal(invoice)
    const backgroundColor = invoice.items.length % 2 === 0 ? '#FFF' : '#f9f9f9'

    return (
        <Container backgroundColor={backgroundColor}>
            <RowItem flex={6} align="right">
                Grand Total:
            </RowItem>
            <RowItem flex={1} align="right">
                {symbol}{total.toFixed(2)}
            </RowItem>
        </Container>
    )
}