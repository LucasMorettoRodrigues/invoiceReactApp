import { atom } from "recoil";

export const printModeRecoilState = atom({
    key: 'printModeRecoilState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});