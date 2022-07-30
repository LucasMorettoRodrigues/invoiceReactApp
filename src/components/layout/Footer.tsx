import styled from "styled-components"

const Text = styled.div`
    font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
    margin: 40px 0 20px 0;
    text-align: center;
    color: #404040;
    font-size: 10px;
`
const HighLight = styled.span`
    color: red;
`

type Props = {
    printMode: boolean
}

export const Footer = ({ printMode }: Props) => {

    if (printMode) {
        return <></>
    }

    return (
        <Text>
            Made with <HighLight>♥</HighLight> in Bauru by Lucas.
        </Text>
    )
}