import { Human } from './human';
import { Currency } from '../enums';
import { IClonable, IMoney } from '../interfaces';

export class Money implements IMoney, IClonable {
    amount: number;
    quantity: number;
    currency?: Currency;
    owner: Human;

    constructor(money: IMoney, owner: Human) {
        this.amount = money.amount;
        this.quantity = money.quantity;
        this.currency = money.currency;
        this.owner = owner;
    }

    clone(): IClonable {
        throw new Error('Method not implemented.');
    }

    equals(other: Money, strict: boolean = true): boolean {
        if (strict) {
            return (
                this.amount     === other.amount &&
                this.quantity   === other.quantity &&
                this.owner.name === other.owner.name
            );
        }
        return (
            this.amount   === other.amount &&
            this.quantity === other.quantity
        );

    }

    static default(): Money {
        return new Money({
            amount: 0,
            quantity: 0,
            currency: undefined
        },
        Human.default());
    }

    toString(): string {
        return `${this.amount}${this.currency ?? ""}${this.quantity > 1 ? ` x${this.quantity}` : ""}`;
    }
}