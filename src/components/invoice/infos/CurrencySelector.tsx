import styled from "styled-components"
import { useRecoilState } from "recoil"
import { CurrencyService } from "../../../services/CurrencyService"
import { currencyRecoilState } from "../../../state/Currency"
import { ChangeEvent } from "react"
import { invoiceRecoilState } from "../../../state/Invoice"
import { TInvoice } from "../../../types/Invoice"
import { LocalStorageService } from "../../../services/LocalStorageService"

const Select = styled.select`
    font-size: 14px;
`
const Option = styled.option``

const LocalStorage = new LocalStorageService()
const currencyService = new CurrencyService()
const currencies = currencyService.all()

export const CurrencySelector = () => {
  const [currency, setCurrency] = useRecoilState(currencyRecoilState)
  const [invoiceState, setInvoiceState] = useRecoilState(invoiceRecoilState)

  const handleChangeCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
    const formerCurrency = currency
    const newCurrency = JSON.parse(e.target.value)

    setCurrency(newCurrency)

    const confirmConvert = window.confirm('Do you want to convert the values to the selected currency?');

    if (confirmConvert) {
      convertValues(formerCurrency.code, newCurrency.code)
    }
  }

  const convertValues = async (formerCurrencyCode: string, newCurrencyCode: string) => {
    const conversionRate = await currencyService
      .getConversionRate(formerCurrencyCode, newCurrencyCode)

    if (!conversionRate) {
      alert('Sorry, it was not possible to convert.')
      return
    }

    const newInvoice = {
      ...invoiceState,
      items: invoiceState.items.map(item => (
        {
          ...item,
          cost: Math.round(item.cost * conversionRate * 100) / 100
        }
      ))
    }

    saveInvoice(newInvoice)
  }

  // Set new Invoice and update state
  const saveInvoice = (newInvoice: TInvoice) => {
    setInvoiceState(newInvoice)
    LocalStorage.setInvoice(newInvoice)
  }

  return (
    <Select
      value={JSON.stringify(currency)}
      onChange={handleChangeCurrency}
    >
      {currencies.map((currency) => (
        <Option
          key={currency.name}
          value={JSON.stringify(currency)}
        >
          {currency.name}
        </Option>
      ))}
    </Select>
  )
}
