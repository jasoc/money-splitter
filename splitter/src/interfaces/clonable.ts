export interface Clonable {
    clone(): Clonable;
    equals(other: Clonable): boolean;
}