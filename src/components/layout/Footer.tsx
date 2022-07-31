import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { printModeRecoilState } from "../../state/PrintMode"

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

export const Footer = () => {
    const printMode = useRecoilValue(printModeRecoilState)

    if (printMode) {
        return <></>
    }

    return (
        <Text>
            Made with <HighLight>♥</HighLight> in Bauru by Lucas.
        </Text>
    )
}