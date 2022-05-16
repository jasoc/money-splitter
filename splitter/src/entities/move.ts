import { Money } from "./money";
import { Operation } from "../enums";
import { IEntity } from "../interfaces";
import { Utils } from "../utils";

export class Move {
    operation: Operation;
    subject: IEntity;
    destination: IEntity;
    money: Money[];

    constructor({ operation, subject: from, destination: to, money }: {
        operation: Operation;
        subject: IEntity;
        destination: IEntity;
        money: Money | Money[];
    }) {
        this.operation = operation;
        this.subject = from;
        this.destination = to;
        if (money instanceof Array) {
            this.money = Utils.compactMoney(money);
        } else {
            this.money = [money];
        }
    }

    toString(): string {
        let moneyStr: string = "";
        if (this.money instanceof Array) {
            moneyStr = this.money
                .map(m => m.toString()).join(", ");
        }
        switch (this.operation) {
            case Operation.gives:
                return `${this.subject.name} gives ${moneyStr} to ${this.destination.name}`;
            case Operation.takes:
                return `${this.subject.name} takes ${moneyStr} from ${this.destination.name}`;
            case Operation.pays:
                return `${this.subject.name} pays ${moneyStr} to ${this.destination.name}`;
        }
    }
}
