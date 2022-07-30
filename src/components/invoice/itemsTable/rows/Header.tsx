import styled from "styled-components"

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

type Props = {
    currencySymbol: string
}

export const Header = ({ currencySymbol }: Props) => {
    return (
        <Container>
            <RowItem style={{ width: '36px' }}></RowItem>
            <RowItem flex={6}>Description</RowItem>
            <RowItem flex={2}>Quantity</RowItem>
            <RowItem flex={2}>Cost {currencySymbol}</RowItem>
            <RowItem flex={2} align="right">Total</RowItem>
        </Container>
    )
}