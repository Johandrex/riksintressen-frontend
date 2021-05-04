/**
 * Class making up a Riksintresse as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

 export class RiksintresseList {
    id!: number;
    namn!: string;

    kategorier!: Array<string>;
    kommuner!: Array<string>;
    lan!: Array<string>;
}
