/**
 * Class making up a Riksintresse as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

export class Riksintresse {
    id: number;
    namn: string;
    beskrivning: string;
    motivering: string;
    diarienummer: string;

    geometri: number; /* id */

    kommun: string;
    lan: string;

    kulturmiljotyp: Array<string>;

    version: number;
    
    constructor(id: number, namn: string, beskrivning: string, motivering: string, diarienummer: string,
        geometri: number, kommun: string, lan: string, kulturmiljotyp: Array<string>, version: number) {
        /* hämtas från riksintresse table */
        this.id = id;
        this.namn = namn;
        this.beskrivning = beskrivning;
        this.motivering = motivering;
        this.diarienummer = diarienummer;

        /* geometri table */
        this.geometri = geometri;

        /* riksintresse_i_kommun, kommun, lan table */
        this.kommun = kommun;
        this.lan = lan;

        /* Array: riksintresse_har_kulturmiljotyp, kulturmiljotyp */
        this.kulturmiljotyp = kulturmiljotyp;

        /* riksintresse_har_version */
        this.version = version;
    }
}
