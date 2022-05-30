import { Money } from "./entities/money";

export class Utils {

    static getClosestAmount(totalAmount: number, money: Money[]): Money {
        let min: number = totalAmount;
        let res: Money = money[0];
        for (let m of money) {
            const delta = Math.abs(totalAmount - m.amount);
            if (delta < min) {
                min = delta;
                res = m;
            }
        }
        return res;
    }
    
    static getClosestLowerAmount(totalAmount: number, money: Money[]): Money {
        let min: number = totalAmount;
        let res: Money = money[0];
        for (let m of money) {
            const delta = totalAmount - m.amount;
            if (delta < 0) {
                continue;
            }
            if (delta < min) {
                min = delta;
                res = m;
            }
        }
        return res;
    }
    
    static spreadMoney(money: Money[]): Money[] {
        let res: Money[] = [];
        const moneyClone = money.map((m) => m.clone());
        for (let m of moneyClone) {
            let quantity: number = m.quantity;
            m.quantity = 1;
            for (let i: number = 0; i < quantity; i++) {
                res.push(m);
            }
        }
        return res;
    }
    
    static compactMoney(money: Money[]): Money[] {
        const equals = (m1: Money, m2: Money): boolean => {
            return m1.amount     === m2.amount
                && m1.currency   === m2.currency
                && m1.owner.name === m2.owner.name;
        };
        let res: Money[] = [];
        const moneyClone = money.map((m) => m.clone());
        for (let m of moneyClone) {
            if (res.some(r => equals(r, m))) {
                continue;
            }
            let cnt: number = 0;
            for (let _m of moneyClone) {
                if (equals(_m, m)) {
                    cnt += 1;
                }
            }
            m.quantity = cnt;
            res.push(m);
        }
        return res;
    }

    static roundMoney(money: number): number {
        return Math.round(money * 100) / 100;
    }
}
