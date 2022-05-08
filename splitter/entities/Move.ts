import { IEntity } from "../interfaces/IEntity";
import { Operation } from "../enums/Operation";
import { Money } from "./Money";
import { Human } from "./Human";
import { Pot } from "./Pot";

export class Move {
    operation: Operation;
    from: IEntity;
    to: IEntity;
    money: Money | Money[];

    constructor({ operation, from, to, money }: {
        operation: Operation;
        from: IEntity;
        to: IEntity;
        money: Money | Money[];
    }) {
        this.operation = operation;
        this.from = from;
        this.to = to;
        this.money = money;
    }

    repr(): string {
        let moneyStr: string = "";
        let infos: string = "";
        if (this.money instanceof Array) {
            moneyStr = this.money.map(m => `${m.amount}${m.currency ?? ' money'} x ${m.quantity}`).join(", ");
        }
        else {
            moneyStr = `${this.money.amount}${this.money.currency ?? ' money'} x ${this.money.quantity}`;
        }
        if (this.from instanceof Human) {
            infos = `[${(this.from as Human).amountToPay} - ${(this.from as Human).amountMoneyPayed()}]`;
        }
        if (this.from instanceof Pot) {
            infos = `[${(this.from as Pot).amountPayed()}]`;
        }
        return `${this.from.name} ${infos} ${Operation[this.operation]} ${this.to.name} ${moneyStr}`;
    }
}
