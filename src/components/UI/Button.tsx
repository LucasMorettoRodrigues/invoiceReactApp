import { ReactNode } from "react"
import styled from "styled-components"

const SButton = styled.button<{ color: string }>`
    padding: 6px 12px;
    background-color: ${props => props.color === 'red' ? '#d9534f' : '#428bca'};
    border: ${props => props.color === 'red' ? '1px solid #d43f3a;' : '1px solid #357ebd'};
    height: 34px;
    border-radius: 4px;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.color === 'red' ? '#c04945' : '#3276b1'};
        border: ${props => props.color === 'red' ? '1px solid #be3a36;' : '1px solid #285e8e'};
    }

    &:focus {
        background-color: ${props => props.color === 'red' ? '#c04945' : '#3276b1'};
        border: ${props => props.color === 'red' ? '1px solid #be3a36;' : '1px solid #285e8e'};     
    }
`

type Props = {
    children: ReactNode,
    onClick: () => void,
    color: string
}

export const Button = ({ children, onClick, color }: Props) => {
    return (
        <SButton onClick={onClick} color={color}>
            {children}
        </SButton>
    )
}