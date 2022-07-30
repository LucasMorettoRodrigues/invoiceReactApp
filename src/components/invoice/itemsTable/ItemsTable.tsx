import { ChangeEvent } from "react"
import { TInvoice } from "../../../types/Invoice"
import { calculateGrandTotal, calculateTax, invoiceSubTotal } from "../../../utils/Functions"
import { AddItem } from "./rows/AddItem"
import { GrandTotal } from "./rows/GrandTotal"
import { Header } from "./rows/Header"
import { TableItem } from "./rows/TableItem"
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
                <TableItem
                    key={index}
                    item={item}
                    index={index}
                    handleRemoveItem={handleRemoveItem}
                    handleOnChange={handleChangeItem}
                    printMode={printMode}
                    currencySymbol={currencySymbol}
                    backgroundColor={index % 2 === 1 ? '#FFF' : '#f9f9f9'}
                />
            ))}
            {
                !printMode &&
                <AddItem
                    handleAddItem={handleAddItem}
                    backgroundColor={invoice.items.length % 2 === 1 ? '#FFF' : '#f9f9f9'}
                />
            }
            <SubTotal
                value={invoiceSubTotal(invoice)}
                currencySymbol={currencySymbol}
                backgroundColor={invoice.items.length % 2 === 0 ? '#FFF' : '#f9f9f9'}
            />
            <Tax
                value={calculateTax(invoice)}
                tax={invoice.tax} handleOnChange={handleChangeInvoice}
                currencySymbol={currencySymbol}
                backgroundColor={invoice.items.length % 2 === 1 ? '#FFF' : '#f9f9f9'}
            />
            <GrandTotal
                value={calculateGrandTotal(invoice)}
                currencySymbol={currencySymbol}
                backgroundColor={invoice.items.length % 2 === 0 ? '#FFF' : '#f9f9f9'}
            />
        </>
    )
}