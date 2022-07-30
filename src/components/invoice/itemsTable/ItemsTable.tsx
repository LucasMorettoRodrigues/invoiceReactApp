import { ChangeEvent } from "react"
import { TInvoice } from "../../../types/Invoice"
import { calculateGrandTotal, calculateTax, invoiceSubTotal } from "../../../utils/Functions"
import { AddItem } from "./rows/AddItem"
import { GrandTotal } from "./rows/GrandTotal"
import { Header } from "./rows/Header"
import { Item } from "./rows/Item"
import { SubTotal } from "./rows/SubTotal"
import { Tax } from "./rows/Tax"

type Props = {
    invoice: TInvoice,
    handleChangeInvoice: (e: ChangeEvent<HTMLInputElement>) => void,
    handleChangeItem: (e: ChangeEvent<HTMLInputElement>, index: number) => void,
    handleAddItem: () => void,
    handleRemoveItem: (index: number) => void
    printMode: boolean,
    currencySymbol: string
}

export const ItemsTable = ({ invoice, handleChangeInvoice, handleChangeItem, handleAddItem, handleRemoveItem, printMode, currencySymbol }: Props) => {

    return (
        <>
            <Header currencySymbol={currencySymbol} />

            {invoice.items.map((item, index) => (
                <Item

                />
            ))}
            {
                !printMode &&
                <AddItem

                />
            }
            <SubTotal

            />
            <Tax

            />
            <GrandTotal

            />
        </>
    )
}