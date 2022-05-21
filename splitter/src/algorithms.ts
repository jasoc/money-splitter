import { Move, Pot } from "./entities";
import { Operation } from "./enums";
import { IHuman } from "./interfaces";
import { Utils } from "./utils";

export function resolveAllRestLinear(people: IHuman[]): Pot {

    const pot: Pot = new Pot(people);

    const solvedPeople = pot.people.filter(p => p.moneyAmount === p.amountToPay);

    // If some people have the perfect amount for what they
    // have to pay, they get removed from the algorithm
    
    for (let person of solvedPeople) {
        pot.moneyPayed.push(...person.money);
        pot.moves.push(new Move({
            operation:   Operation.pays,
            subject:     person,
            destination: pot,
            money:       person.money,
        }));
        pot.people.splice(pot.people.indexOf(person), 1);
    }

    // First thing, people pays the nearest amount
    // to the total amount, even though they have
    // some rest left.

    for (let person of pot.people) {
        const rightAmountMoney = Utils.spreadMoney(person.rightAmountMoney());
        
        pot.moneyPayed.push(...rightAmountMoney);
        person.money = Utils.spreadMoney(person.money);
        person.removeMoney(...rightAmountMoney);

        pot.moves.push(new Move({
            operation:   Operation.pays,
            subject:     person,
            destination: pot,
            money:       rightAmountMoney,
        }));
    }

    pot.moneyPayed = Utils.spreadMoney(pot.moneyPayed);

    let ppl = pot.people
        .filter(p => p.rest != 0)
        .sort((a, b) => b.rest - a.rest);

    for (let person of ppl) {
        while (person.rest != 0 && pot.amountPayed() >= pot.totalAmount) {
            const amount = Utils.getClosestLowerAmount(person.rest, pot.moneyPayed);
       
            if (!amount) {
                break;
            }
       
            if (pot.amountPayed() - amount.amount * amount.quantity < pot.totalAmount) {
                break;
            }
       
            person.getMoney(amount);
            if (person.rest < 0) {
                person.removeMoney(amount);
                break;
            }
       
            pot.moves.push(new Move({
                operation:   Operation.takes,
                subject:     person,
                destination: pot,
                money:       amount,
            }));
       
            pot.removeMoney(amount);
        }
    }

    pot.moneyPayed = Utils.compactMoney(pot.moneyPayed);

    return pot;
}