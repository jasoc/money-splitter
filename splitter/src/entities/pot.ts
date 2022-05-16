import { Move } from "./move";
import { Human } from "./human";
import { Money } from "./money";
import { IEntity } from "../interfaces";
import { RestCategory } from "../enums";
import { Utils } from "../utils";

export class Pot implements IEntity {
    name: string = "Pot";

    people: Human[];
    
    moves: Move[] = [];
    moneyPayed: Money[] = [];
    
    threshold: number = 0.4;
    totalAmount: number;

    constructor({ people, totalAmount }: {
        people: Human[];
        totalAmount: number
    }) {
        this.people = people;
        this.totalAmount = totalAmount;
    }
    
    amountPayed(): number {
        let res: number = 0;
        for (let m of this.moneyPayed) {
            res += m.amount * m.quantity;
        }
        return res;
    }

    amountPayedPercentage(): number {
        return this.amountPayed() / this.totalAmount * 100;
    }

    fullyPayed(): boolean {
        return this.amountPayed() === this.totalAmount;
    }

    allTopMoney(threshold: number = this.threshold): Money[] {
        let res: Money[] = [];
        for (let p of this.people) {
            res = res.concat(p.topMoney(threshold));
        }
        return res.sort((a, b) => b.amount - a.amount);
    }

    allBottomMoney(threshold: number = this.threshold): Money[] {
        let res: Money[] = [];
        for (let p of this.people) {
            res = res.concat(p.bottomMoney(threshold));
        }
        return res.sort((a, b) => b.amount - a.amount);
    }

    getPeopleByRestCategory(cat: RestCategory) {
        return this.people.filter(p => p.restCategory() === cat);
    }

    removeMoney(...money: Money[]): void {
        for (let _m of money) {
            for (let m of this.moneyPayed) {
                if (!m.equals(_m)) {
                    continue;
                }
                this.moneyPayed.splice(this.moneyPayed.indexOf(m), 1);
                break;
            }
        }
    }

    rest(): number {
        return Utils.roundMoney(this.amountPayed() - this.totalAmount);
    }
}
