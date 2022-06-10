import { Money } from "../entities";
import { Entity } from "./entity";

export declare type Token = (Entity | Money[] | string);

export function IsEntity(possibleEntity: any): possibleEntity is Entity {
    try {
        return 'name' in possibleEntity;
    } catch {
        return false;
    }
}

export function IsMoneyArr(possibleMoneyArr: any): possibleMoneyArr is Money[] {
    try {
        return !IsString(possibleMoneyArr) && (<Money[]>possibleMoneyArr).length != undefined;
    } catch {
        return false;
    }
}

export function IsString(possibleString: any): possibleString is string {
    try {
        return typeof possibleString === 'string';
    } catch {
        return false;
    }
}

