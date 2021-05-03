/**
 * Klass med register över viktig information som län, kommuner, kulturmiljötyper.
 * This class is used for testing and prototyping communication with db.
 */

 export class Register {
    kommuner: Array<KeyValue>;
    lan: Array<KeyValue>;
    kulturmiljotyper: Array<KeyValue>;
    
    constructor() {
        this.kommuner = new Array<KeyValue>();
        this.lan = new Array<KeyValue>();
        this.kulturmiljotyper = new Array<KeyValue>();
    }

    initKommuner(id: number, namn: string) {
        this.kommuner.push(new KeyValue(id, namn));
    }

    initLan(id: number, namn: string) {
        this.kommuner.push(new KeyValue(id, namn));
    }

    initKulturmiljotyper(id: number, namn: string) {
        this.kommuner.push(new KeyValue(id, namn));
    }
}

class KeyValue {
    constructor(key: number, value: string) {
        this.key = key;
        this.value = value;
    }

    key: number;
    value: string;
}