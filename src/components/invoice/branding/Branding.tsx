import { ChangeEvent, useRef, useState } from "react"
import styled from "styled-components"
import { TInvoice } from "../../../types/Invoice"
import { Input } from "../UI/Input"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 2em;
`
const InnerContainer = styled.div`
  padding: 0 15px;
`
const Image = styled.img`
    width: 300px;
    vertical-align: middle;
`
const ButtonsContainer = styled.div`
    text-align: right;
`
const Button = styled.button`
    padding: 0;
    margin-left: 4px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #428bca;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        border-bottom: 1px solid #356ea0;
        color: #356ea0;
    }

    &:focus {
        border-bottom: 1px solid #356ea0;
        color: #356ea0;
    }
`

type Props = {
    invoice: TInvoice,
    logo: string
    handleChangeInvoice: (e: ChangeEvent<HTMLInputElement>) => void
    printMode: boolean,
    readUrl: (input: ChangeEvent<HTMLInputElement>) => void
}

export const Branding = ({ invoice, handleChangeInvoice, printMode, logo, readUrl }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [logoRemoved, setLogoRemoved] = useState(false)

    // Triggers the logo chooser click event
    const handleEditLogo = () => {
        inputRef.current && inputRef.current.click()
    }

    return (
        <Container>
            <InnerContainer>
                <Input
                    label='Invoice #'
                    type='text'
                    name='invoice_number'
                    fontWeight='bold'
                    onChange={(e) => handleChangeInvoice(e)}
                    value={invoice.invoice_number}
                />
            </InnerContainer>
            <InnerContainer>
                <input onChange={readUrl} ref={inputRef} style={{ display: 'none' }} type="file" id="imgInp" />
                {
                    !logoRemoved &&
                    <Image ref={imgRef} src={logo} alt="your image" />
                }
                {
                    !printMode &&
                    <ButtonsContainer>
                        <Button onClick={handleEditLogo}>Edit Logo</Button>
                        <Button onClick={() => setLogoRemoved(!logoRemoved)}>
                            {logoRemoved ? 'Show logo' : 'Hide logo'}
                        </Button>
                    </ButtonsContainer>
                }
            </InnerContainer>
        </Container>
    )
}