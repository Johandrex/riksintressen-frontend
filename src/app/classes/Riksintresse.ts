/**
 * Class making up a Riksintresse as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

export class Riksintresse {
    id: string;
    name: string;
    description: string;
    motivation: string;
    diarienumber: string;
    
    constructor(id: string, name: string, description: string, motivation: string, diarienumber: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.motivation = motivation;
        this.diarienumber = diarienumber;
    }
}
