import styled from "styled-components"
import { printInfo } from "../../../utils/Functions"
import { Button } from "../../UI/Button"

const Container = styled.div`
    display: flex;
    padding: 14px 0 0 0;

    @media print {
        display:none;
    }
`
const InputController = styled.div`
    margin-right: 3px;
`

type Props = {
    handleReset: () => void,
    handlePrintMode: () => void,
    printMode: boolean
}

export const Actions = ({ handleReset, handlePrintMode, printMode }: Props) => {

    return (
        <Container>
            {
                printMode &&
                <InputController>
                    <Button color='blue' onClick={printInfo} >Print</Button>
                </InputController>
            }
            <InputController>
                <Button color='blue' onClick={handleReset} >Reset</Button>
            </InputController>
            <InputController>
                <Button color='blue' onClick={handlePrintMode} >
                    Turn {printMode ? 'off' : 'on'} Print Mode
                </Button>
            </InputController>
        </Container>
    )
}