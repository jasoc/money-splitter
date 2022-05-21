import { IMoney } from "./imoney";

export interface IHuman {
    name: string;
    amountToPay: number;
    money: IMoney[];
}