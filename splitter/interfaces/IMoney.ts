import { Currency } from "../enums/Currency";

export interface IMoney {
    amount: number;
    quantity: number;
    currency?: Currency;
}
