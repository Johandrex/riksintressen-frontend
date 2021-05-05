/**
 * Class making up a Riksintresse as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

export class Riksintresse {
    id!: number;
    namn!: string;
    beskrivning!: string; 
    motivering!: string;
    version!: number;
    geometri_id!: number;

    kategorier!: Array<string>;
    kommuner!: Array<string>;
    lan!: Array<string>;
}
