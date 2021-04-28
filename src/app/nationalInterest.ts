/**
 * Class making up a Riksintresse as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

export class NationalInterest {
    id: string;
    name: string;
    categories: string;
    municipality: string;
    province: string;
    lastUpdated: string;
    
    constructor(id: string, name: string, categories: string, municipality: string, province: string, lastUpdated: string) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.municipality = municipality;
        this.province = province;
        this.lastUpdated = lastUpdated;
    }
}
