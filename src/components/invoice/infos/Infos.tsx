import styled from "styled-components"
import { ChangeEvent } from "react"
import { TInvoice } from "../../../types/Invoice"
import { Input } from "../../UI/Input"
import { useRecoilState, useRecoilValue } from "recoil"
import { printModeRecoilState } from "../../../state/PrintMode"
import { invoiceRecoilState } from "../../../state/Invoice"
import { LocalStorageService } from "../../../services/LocalStorageService"
import { CurrencySelector } from "./CurrencySelector"
import { editInvoice } from "../../../utils/Functions"

const RowInfosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`
const InputsWrapper = styled.div`
  padding: 0 15px;
  flex: 1;
`
const InputController = styled.div<{ float?: string }>`
  padding: 3px 0;
  margin-right: 0;
  width: 300px;
  float: ${props => props.float === 'right' ? 'right' : null};
`

const LocalStorage = new LocalStorageService()

export const Infos = () => {

    const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)
    const printMode = useRecoilValue(printModeRecoilState)

    // Update Invoice
    const handleChangeInvoice = (e: ChangeEvent<HTMLInputElement>, key?: keyof TInvoice) => {
        const newInvoice = editInvoice(e, invoiceState, key)
        saveInvoice(newInvoice)
    }

    // Set new Invoice and update state
    const saveInvoice = (newInvoice: TInvoice) => {
        setInvoiceState(newInvoice)
        LocalStorage.setInvoice(newInvoice)
    }

    return (
        <RowInfosContainer>
            <InputsWrapper>
                <InputController>
                    <Input
                        type='text'
                        name='name'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoiceState.customer_info.name}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='web_link'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoiceState.customer_info.web_link}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='address1'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoiceState.customer_info.address1}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='address2'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoiceState.customer_info.address2}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='postal'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoiceState.customer_info.postal}
                    />
                </InputController>
                {
                    !printMode &&
                    <InputController>
                        <CurrencySelector />
                    </InputController>
                }
            </InputsWrapper>
            <InputsWrapper>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='name'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoiceState.company_info.name}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='web_link'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoiceState.company_info.web_link}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='address1'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoiceState.company_info.address1}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='address2'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoiceState.company_info.address2}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='postal'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoiceState.company_info.postal}
                        textAlign='right'
                    />
                </InputController>
            </InputsWrapper>
        </RowInfosContainer>
    )
}