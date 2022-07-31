import { AddItem } from "./rows/AddItem"
import { GrandTotal } from "./rows/GrandTotal"
import { Header } from "./rows/Header"
import { TableItem } from "./rows/TableItem"
import { SubTotal } from "./rows/SubTotal"
import { Tax } from "./rows/Tax"
import { useRecoilValue } from "recoil"
import { invoiceRecoilState } from "../../../state/Invoice"
import { printModeRecoilState } from "../../../state/PrintMode"

export const ItemsTable = () => {
    const invoice = useRecoilValue(invoiceRecoilState)
    const printMode = useRecoilValue(printModeRecoilState)

    return (
        <>
            <Header />
            {invoice.items.map((item, index) => (
                <TableItem
                    key={index}
                    index={index}
                    item={item}
                />
            ))}
            {
                !printMode &&
                <AddItem />
            }
            <SubTotal />
            <Tax />
            <GrandTotal />
        </>
    )
}