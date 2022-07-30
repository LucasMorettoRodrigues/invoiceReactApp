export type TInvoice = {
    company_info: Info,
    customer_info: Info,
    invoice_number: number,
    items: Item[],
    tax: number
}

export type Info = {
    name: string,
    address1: string,
    address2: string,
    postal: string,
    web_link: string
}

export type Item = {
    qty: number,
    description: string,
    cost: number
}