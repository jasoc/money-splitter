import { Human, Move, Pot } from "./entities";
import { Operation } from "./enums";
import { compactMoney, getClosestLowerAmount, roundMoney, spreadMoney } from "./utils";

export function resolveAllRestLinear(people: Human[]): Pot {
    let totalAmount: number = 0;

    for (let p of people) {
        totalAmount += p.amountToPay;
    }

    const pot: Pot = new Pot({ people, totalAmount });

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
        people.splice(people.indexOf(person), 1);
    }

    // First thing, people pays the nearest amount
    // to the total amount, even though they have
    // some rest left.

    for (let person of pot.people) {
        const rightAmountMoney = spreadMoney(person.rightAmountMoney());
        
        pot.moneyPayed.push(...rightAmountMoney);
        person.money = spreadMoney(person.money);
        person.removeMoney(...rightAmountMoney);

        pot.moves.push(new Move({
            operation:   Operation.pays,
            subject:     person,
            destination: pot,
            money:       rightAmountMoney,
        }));
    }

    pot.moneyPayed = spreadMoney(pot.moneyPayed);

    for (let person of pot.people.filter(p => p.rest != 0).sort((a, b) => b.rest - a.rest)) {
        while (person.rest != 0 && pot.amountPayed() >= pot.totalAmount) {
            const amount = getClosestLowerAmount(person.rest, pot.moneyPayed);
       
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

    pot.moneyPayed = compactMoney(pot.moneyPayed);

    return pot;
}