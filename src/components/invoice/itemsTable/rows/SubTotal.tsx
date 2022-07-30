import styled from "styled-components"

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

type Props = {
    value: number
    currencySymbol: string,
    backgroundColor: string
}

export const SubTotal = ({ value, currencySymbol, backgroundColor }: Props) => {
    return (
        <Container backgroundColor={backgroundColor}>
            <RowItem flex={6} align="right">
                Sub Total
            </RowItem>
            <RowItem flex={1} align="right">
                {currencySymbol}{value.toFixed(2)}
            </RowItem>
        </Container>
    )
}