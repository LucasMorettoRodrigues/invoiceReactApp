import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { currencyRecoilState } from "../../../../state/Currency"

const Container = styled.div`
    display: flex;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`
const RowItem = styled.div<{ flex?: number, align?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
`

export const Header = () => {
    const { symbol } = useRecoilValue(currencyRecoilState)

    return (
        <Container>
            <RowItem style={{ width: '36px' }}></RowItem>
            <RowItem flex={6}>Description</RowItem>
            <RowItem flex={2}>Quantity</RowItem>
            <RowItem flex={2}>Cost {symbol}</RowItem>
            <RowItem flex={2} align="right">Total</RowItem>
        </Container>
    )
}