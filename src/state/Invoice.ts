import { atom } from "recoil";
import { DEFAULT_INVOICE } from "../constants/DefaultValues";

export const invoiceRecoilState = atom({
    key: 'invoiceRecoilState', // unique ID (with respect to other atoms/selectors)
    default: DEFAULT_INVOICE, // default value (aka initial value)
});