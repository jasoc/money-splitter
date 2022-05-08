import { Human } from "./splitter/entities/Human";
import { Pot } from "./splitter/entities/Pot";
import { Operation } from "./splitter/enums/Operation";
import { Currency } from "./splitter/enums/Currency";
import { Move } from "./splitter/entities/Move";
import { compactMoney, getClosestLowerAmount, roundMoney, spreadMoney } from "./splitter/Utils";

function main() {

    const currency = Currency.bitcoin;

    const people: Human[] = [
        new Human({
            name: "Erison",
            amountToPay: 18.92,
            money: [
                { amount: 20, quantity: 1, currency: currency },
                { amount: 5, quantity: 2, currency: currency },
                { amount: 50, quantity: 1, currency: currency },
            ]
        }),
        new Human({
            name: "Paride",
            amountToPay: 16.4,
            money: [
                { amount: 10, quantity: 1, currency: currency },
                { amount: 5, quantity: 2, currency: currency },
                // { amount: 2, quantity: 1, currency: currency },
            ]
        }),
        new Human({
            name: "Riccardo",
            amountToPay: 7,
            money: [
                { amount: 7, quantity: 1, currency: currency },
            ]
        }),
        new Human({
            name: "Lorenzo",
            amountToPay: 15,
            money: [
                { amount: 10, quantity: 1, currency: currency },
                { amount: 1, quantity: 6, currency: currency },
            ]
        }),
        new Human({
            name: "Alessandro",
            amountToPay: 4.23,
            money: [
                { amount: 5, quantity: 1, currency: currency },
            ]
        }),
    ];

    // const people: Human[] = [
    //     new Human({
    //         name: "Erison",
    //         amountToPay: 17.5,
    //         money: [
    //             { amount: 10, quantity: 1, currency: currency },
    //             { amount: 2, quantity: 3, currency: currency },
    //             { amount: 0.2, quantity: 10, currency: currency },
    //         ]
    //     }),
    //     new Human({
    //         name: "Paride",
    //         amountToPay: 13.13,
    //         money: [
    //             { amount: 5, quantity: 2, currency: currency },
    //             { amount: 0.1, quantity: 50, currency: currency },
    //         ]
    //     }),
    //     new Human({
    //         name: "Lorenzo",
    //         amountToPay: 56.2,
    //         money: [
    //             { amount: 100, quantity: 1, currency: currency },
    //         ]
    //     }),
    //     new Human({
    //         name: "Riccardo",
    //         amountToPay: 3,
    //         money: [
    //             { amount: 0.5, quantity: 3, currency: currency },
    //             { amount: 0.02, quantity: 4, currency: currency },
    //             { amount: 0.10, quantity: 400, currency: currency },
    //         ]
    //     }),
    // ];

    let totalAmount: number = 0;

    for (let p of people) {
        totalAmount += p.amountToPay;
    }

    console.log(`Total amount: ${roundMoney(totalAmount)}`);

    const pot: Pot = new Pot({ people, totalAmount });

    const solvedPeople = pot.people.filter(p => p.moneyAmount === p.amountToPay);

    // If some people have the perfect amount for what they
    // have to pay, they get removed from the algorithm
    
    for (let person of solvedPeople) {
        pot.moneyPayed.push(...person.money);
        pot.moves.push(new Move({
            operation: Operation.gives,
            from:      person,
            to:        pot,
            money:     person.money,
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
            operation: Operation.gives,
            from:      person,
            to:        pot,
            money:     rightAmountMoney,
        }));
    }

    pot.moneyPayed = spreadMoney(pot.moneyPayed);

    console.log(`Pot has now ${pot.amountPayed()}`);

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
                operation: Operation.gives,
                from:      pot,
                to:        person,
                money:     amount,
            }));
       
            pot.removeMoney(amount);
        }
    }

    pot.moneyPayed = compactMoney(pot.moneyPayed);
    
    for (let move of pot.moves) {
        console.log(move.repr());
    }

    console.log(`Pot will pay ${pot.amountPayed()}`);
    console.log(`people left to pay: ${pot.people.filter(p => p.rest != 0).map(p => `${p.name} with rest of ${p.rest}`).join(', ')}`);
    console.log(`The total rest will be ${roundMoney(pot.amountPayed() - pot.totalAmount)}`)
}

main();