import { ChangeEvent } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
`
const Label = styled.label<{ fontWeight?: string }>`
  white-space: nowrap;
  font-weight: ${props => props.fontWeight ? props.fontWeight : null};
`
const SInput = styled.input<{ fontWeight?: string, textAlign?: string }>`
  font-size: 14px;
  background-color: white;
  padding: 1px 2px;
  height: 20px;
  width: 100%;
  text-align: ${props => props.textAlign === 'right' ? 'right' : 'left'};
  font-weight: ${props => props.fontWeight ? props.fontWeight : null};
  border: 1px solid #FFF;
  outline: none;

  &:hover {
    border-color: lightgray;
  }

  &:focus {
    border-color: lightgray;
  }
`

type Props = {
  label?: string,
  name: string,
  type: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  fontWeight?: string,
  value: string | number,
  textAlign?: string,
  placeholder?: string
  autoFocus?: boolean
}

export const Input = ({ label, name, type, onChange, value, fontWeight, textAlign, placeholder, autoFocus }: Props) => {
  return (
    <Container>
      {label && <Label htmlFor={name} fontWeight={fontWeight}>{label}</Label>}
      <SInput
        autoFocus={autoFocus}
        name={name}
        type={type}
        fontWeight={fontWeight}
        onChange={(e) => onChange(e)}
        value={value}
        textAlign={textAlign}
        placeholder={placeholder}>
      </SInput>
    </Container>
  )
}
