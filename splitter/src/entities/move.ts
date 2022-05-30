import { Money } from "./money";
import { Operation } from "../enums";
import { Entity, IClonable, Token } from "../interfaces";
import { Utils } from "../utils";

export class Move implements IClonable {
    operation: Operation;
    subject: Entity;
    destination: Entity;
    money: Money[];

    constructor({ operation, subject: from, destination: to, money }: {
        operation: Operation;
        subject: Entity;
        destination: Entity;
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

    clone(): Move {
        return new Move({
            operation: this.operation,
            subject: this.subject,
            destination: this.destination,
            money: this.money.map(m => m.clone())
        });
    }
    
    equals(other: Move): boolean {
        return this.operation === other.operation
            && this.subject.name == other.subject.name
            && this.destination.name == other.destination.name
            && this.money.every(m => other.money.some(om => om.equals(m)));
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

    tokens(): Token[] {
        switch (this.operation) {
            case Operation.gives:
                return [
                    this.subject,
                    'gives',
                    this.money,
                    'to',
                    this.destination
                ];
            
            case Operation.takes:
                return [
                    this.subject,
                    'takes',
                    this.money,
                    'from',
                    this.destination
                ]
            
            case Operation.pays:
                return [
                    this.subject,
                    'pays',
                    this.money,
                    'to',
                    this.destination
                ];
                
            default:
                return [];
        }
    }
}
