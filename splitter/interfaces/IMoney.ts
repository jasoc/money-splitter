import { Currency } from "../enums/currency";

export interface IMoney {
    amount: number;
    quantity: number;
    currency?: Currency;
}
