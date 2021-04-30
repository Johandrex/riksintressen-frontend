/**
 * Class making up a Geometri as they say in Sweden.
 * This class is used for testing and prototyping communication with db.
 */

export class Geometri {
    id: number;
    polygon: any;
    shape_area: number;
    
    constructor(id: number, polygon: any, shape_area: number) {
        /* hämtas från riksintresse table */
        this.id = id;
        this.polygon = polygon;
        this.shape_area = shape_area;
    }
}
