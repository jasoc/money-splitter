import { Money } from "./money";
import { IClonable, IEntity, IMoney } from "../interfaces";
import { RestCategory } from "../enums";
import { Utils } from "../utils";

export class Human implements IEntity, IClonable {
    name: string;
    amountToPay: number;
    money: Money[];
    initialMoney: Money[];

    constructor({ name, amountToPay, money }: { name: string, amountToPay: number, money: IMoney[] }) {
        this.name = name;
        this.amountToPay = Utils.roundMoney(amountToPay);
        this.money = money
            .map(m => new Money(m, this))
            .sort((a, b) => b.amount - a.amount)
            .reverse();
        this.initialMoney = this.money.map((m) => m.clone());
    }

    clone(): Human {
        return new Human({
            name: this.name,
            amountToPay: this.amountToPay,
            money: []
        });
    }

    equals(other: IClonable): boolean {
        throw new Error("Method not implemented.");
    }

    static default(): Human {
        return new Human({
            name: "Name",
            amountToPay: 0,
            money: []
        });
    }

    get rest(): number {
        return Utils.roundMoney(this.amountMoneyPayed() - this.amountToPay);
    }

    getMoney(money: IMoney): void {
        if (!money.currency && this.money.length > 0) {
            money.currency = this.money[0].currency;
        }
        this.money.push(new Money(money, this));
    }

    get moneyAmount(): number {
        let res: number = 0;
        for (let m of this.money) {
            res += m.amount * m.quantity;
        }
        return res;
    }

    get maxMoney(): Money {
        let max: Money = Money.default();
        for (let m of this.money) {
            if (m.amount > max.amount) {
                max = m;
            }
        }
        return max;
    }

    amountMoneyPayed(): number {
        let initCnt: number = 0;
        let nowCnt: number = 0;
        for (let m of this.initialMoney) {
            initCnt += m.amount * m.quantity;
        }
        for (let m of this.money) {
            nowCnt += m.amount * m.quantity;
        }
        return Utils.roundMoney(Utils.roundMoney(initCnt) - Utils.roundMoney(nowCnt));
    }

    topMoney(threshold: number): Money[] {
        let topMoney: Money[] = [];
        const max = this.maxMoney;
        for (let m of this.money) {
            if (m.amount > max.amount * threshold) {
                topMoney.push(m);
            }
        }
        return topMoney;
    }

    bottomMoney(threshold: number): Money[] {
        let bottomMoney: Money[] = [];
        const max = this.maxMoney;
        for (let m of this.money) {
            if (m.amount < max.amount * threshold) {
                bottomMoney.push(m);
            }
        }
        return bottomMoney;
    }

    restPercentage(): number {
        return this.rest / this.amountToPay * 100;
    }

    rightAmountMoney(): Money[] {
        let cnt: number = this.amountToPay;
        let res: Money[] = [];
        let moneyClone = Utils.spreadMoney(this.money.map((m) => m.clone()));
        
        while (cnt > 0) {
            const amount = Utils.getClosestAmount(cnt, moneyClone);
            if (!amount) {
                break;
            }
            moneyClone.splice(moneyClone.indexOf(amount), 1);
            cnt -= amount.amount;
            res.push(amount);
            cnt = Utils.roundMoney(cnt);
        }
        return Utils.compactMoney(res);
    }

    removeMoney(...money: Money[]): void {
        for (let _m of money) {
            for (let m of this.money) {
                if (!m.equals(_m, false)) {
                    continue;
                }
                this.money.splice(this.money.indexOf(m), 1);
                break;
            }
        }
    }

    restCategory(): RestCategory {
        let restPercentage: number = this.restPercentage();
        if (restPercentage ==  0) return RestCategory.none;
        if (restPercentage <= 10) return RestCategory.small;
        if (restPercentage <= 15) return RestCategory.average;
        if (restPercentage <= 25) return RestCategory.big;
        return RestCategory.huge;
    }
}
