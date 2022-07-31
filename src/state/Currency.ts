import { atom } from "recoil";
import { DEFAULT_CURRENCY } from "../constants/DefaultValues";

export const currencyRecoilState = atom({
    key: 'currencyRecoilState', // unique ID (with respect to other atoms/selectors)
    default: DEFAULT_CURRENCY, // default value (aka initial value)
});