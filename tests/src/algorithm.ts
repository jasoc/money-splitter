import { resolveAllRestLinear, Human, Currency } from "@money-splitter/splitter";

export function main() {

    const currency = Currency.euro;

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

    const finalPot = resolveAllRestLinear(people);

    for (let move of finalPot.moves) {
        console.log(move.toString());
    }

    const peopleWithRestLeft = finalPot.people
        .filter(p => p.rest != 0)
        .map(p => `${p.name} with rest of ${p.rest}`)
        .join(', ');

    console.log(`Pot will pay ${finalPot.amountPayed()}`);
    console.log(`people left to pay: ${peopleWithRestLeft}`);
    console.log(`The total rest will be ${finalPot.rest()}`)
}