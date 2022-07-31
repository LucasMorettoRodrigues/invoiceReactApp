import { atom } from "recoil";
import { DEFAULT_LOGO } from "../constants/DefaultValues";

export const logoRecoilState = atom({
    key: 'logoRecoilState', // unique ID (with respect to other atoms/selectors)
    default: DEFAULT_LOGO, // default value (aka initial value)
});