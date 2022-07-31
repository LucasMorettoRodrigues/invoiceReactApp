import styled from "styled-components"
import { useRecoilState } from "recoil"
import { CurrencyService } from "../../../services/CurrencyService"
import { currencyRecoilState } from "../../../state/Currency"

const Select = styled.select`
    font-size: 14px;
`
const Option = styled.option``

const currencyService = new CurrencyService()
const currencies = currencyService.all()

export const CurrencySelector = () => {
  const [currency, setCurrency] = useRecoilState(currencyRecoilState)

  return (
    <Select
      value={JSON.stringify(currency)}
      onChange={(e) => setCurrency(JSON.parse(e.target.value))}
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
