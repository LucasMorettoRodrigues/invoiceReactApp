import styled from "styled-components"
import { ChangeEvent } from "react"
import { CurrencyService } from "../../../services/CurrencyService"
import { TInvoice } from "../../../types/Invoice"
import { Input } from "../../UI/Input"

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
const Select = styled.select`
  font-size: 14px;
`
const Option = styled.option``

type Currency = {
    name: string,
    symbol: string
}

type Props = {
    currency: Currency,
    handleChangeCurrency: (currencyName: string) => void,
    printMode: boolean,
    invoice: TInvoice,
    handleChangeInvoice: (e: ChangeEvent<HTMLInputElement>, key: keyof TInvoice) => void
}

const currencies = new CurrencyService().all()

export const Infos = ({ currency, handleChangeCurrency, printMode, invoice, handleChangeInvoice }: Props) => {

    return (
        <RowInfosContainer>
            <InputsWrapper>
                <InputController>
                    <Input
                        type='text'
                        name='name'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoice.customer_info.name}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='web_link'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoice.customer_info.web_link}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='address1'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoice.customer_info.address1}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='address2'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoice.customer_info.address2}
                    />
                </InputController>
                <InputController>
                    <Input
                        type='text'
                        name='postal'
                        onChange={(e) => handleChangeInvoice(e, 'customer_info')}
                        value={invoice.customer_info.postal}
                    />
                </InputController>
                {
                    !printMode &&
                    <InputController>
                        <Select value={currency.name} onChange={(e) => handleChangeCurrency(e.target.value)}>
                            {currencies.map((currency, index) => (
                                <Option
                                    key={currency.name}
                                    value={currency.name}
                                >
                                    {currency.name}
                                </Option>
                            ))}
                        </Select>
                    </InputController>
                }
            </InputsWrapper>
            <InputsWrapper>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='name'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoice.company_info.name}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='web_link'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoice.company_info.web_link}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='address1'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoice.company_info.address1}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='address2'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoice.company_info.address2}
                        textAlign='right'
                    />
                </InputController>
                <InputController float='right'>
                    <Input
                        type='text'
                        name='postal'
                        onChange={(e) => handleChangeInvoice(e, 'company_info')}
                        value={invoice.company_info.postal}
                        textAlign='right'
                    />
                </InputController>
            </InputsWrapper>
        </RowInfosContainer>
    )
}