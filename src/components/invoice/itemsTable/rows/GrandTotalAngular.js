import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { currencyRecoilState } from "../../../../state/Currency"
import { invoiceRecoilState } from "../../../../state/Invoice"
import { calculateGrandTotal } from "../../../../utils/Functions"
import angularComponent from "./angular/angular-component"
import angular2reactInstance from "./angular/angular2react-instance"

const Container = styled.div`
    display: flex;
    background-color: ${props => props.backgroundColor};
`

const AngularComponent = angular2reactInstance(angularComponent, 'angularComponent');

export const GrandTotalAngular = () => {
    const invoice = useRecoilValue(invoiceRecoilState)
    const { symbol } = useRecoilValue(currencyRecoilState)

    const total = calculateGrandTotal(invoice).toFixed(2)
    const backgroundColor = invoice.items.length % 2 === 0 ? '#FFF' : '#f9f9f9'

    return (
        <Container backgroundColor={backgroundColor} >
            <AngularComponent
                symbol={symbol}
                total={total}
            />
        </Container>
    )
}