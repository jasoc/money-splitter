export interface IClonable {
    clone(): IClonable;
    equals(other: IClonable): boolean;
}