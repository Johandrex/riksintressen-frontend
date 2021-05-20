import { Injectable } from '@angular/core';

/* Importerar OpenLayers */
import { View, Feature, Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { altKeyOnly, always, click, never, pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import { Draw, Interaction, Modify, Snap } from 'ol/interaction';
import Polygon from 'ol/geom/Polygon';
import GeometryType from 'ol/geom/GeometryType';

/**
 * Klassen hanterar kartans logik och funktioner
 */
@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor() { }

    ngOnInit(): void { }

    public map: any; // Map with layer of map tiles and the layer below
    public layer: any; // The layer used for all map features associated with the national interests
    public vectorSource: any; // Geoserver source used to create and edit features

    // Current selected map feature (singe click)
    public selectInteraction = new Select(
        {
            condition: never,
            style: new Style({ fill: new Fill({ color: '#007496'})  })
        }
    );
    public isUnableToSelectFeature: boolean = false;

    /**
   * Initiate and create map.
   */
    public createMap(): void {
        // Kordinater över visby
        let latitude: number = 18.3278145;
        let longitude: number = 57.6271917;
        // Skapa kartan med position över visby
        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM() // openstreetmap
                })
            ],
            view: new View({
                center: fromLonLat([latitude, longitude]),
                zoom: 12
            })
        });
    }

    /**
     * Get data from the geoserver to create a layer with national interests.
     */
    public getGeoJsonFromServer() {
        // Initialise source
        this.vectorSource = new VectorSource({
            // Make sure to configure the URL according to your needs
            url: 'http://109.225.108.59:8080/geoserver/Workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Workspace%3Ageometri&outputFormat=application%2Fjson&srsname=EPSG:3857',
            format: new GeoJSON()
        });
        // Hämta data från GeoServern
        this.layer = new VectorLayer({
            source: this.vectorSource,
        });
        this.layer.setOpacity(.4);
        this.map.addLayer(this.layer); // lägg på layer på kartan
    }

    /**
     * Selects a feature on the map to mark it.
     * @param id ID of item on map
     */
    public selectMapFeature(id: number) {
        try {
            let feature = this.layer.getSource().getFeatureById('geometri.' + id);
            // Remove previous selected feature, if any
            this.selectInteraction.getFeatures().clear();
            // Add newly selected feature
            this.selectInteraction.getFeatures().push(feature);
            // Display the select style for feature
            this.map.addInteraction(this.selectInteraction);
            // Center and zoom to feature on map
            this.map.getView().fit(feature.getGeometry(), {
                size: this.map.getSize(),
                maxZoom: this.map.getView().getZoom(),
                padding: [100, 100, 100, 100],
                style: { strokeColor: '#007496' },
            });
        }
        catch (e) {
            console.log("Exception at centerOnMapFeature() " + e);
        }
    }

    /**
     * Creates a new map feature.
     */
    public draw: any;
    public snap: any;
    public modifyCreate: any;
    public startCreateMapFeature(): void {
        this.isUnableToSelectFeature = true;
        this.modifyCreate = new Modify({ source: this.vectorSource });
        this.map.addInteraction(this.modifyCreate);

        this.draw = new Draw({
            source: this.vectorSource,
            type: GeometryType.MULTI_POLYGON
        });
        this.map.addInteraction(this.draw);

        this.snap = new Snap({ source: this.vectorSource });
        this.map.addInteraction(this.snap);

        // Save the feature vector?
        // Stop the interaction when finished
    }

    /**
     * Removes the interactions of creating a map feature.
     */
    public stopCreateMapFeature(): void {
        // Find the seeked after interaction on the map
        this.isUnableToSelectFeature = false;
        if (this.draw) { this.map.removeInteraction(this.draw); }
        if (this.snap) { this.map.removeInteraction(this.snap); }
        if (this.modifyCreate) { this.map.removeInteraction(this.modifyCreate); }
        // Store change in database
    }

    /**
     * Modify an existing map feature.
     */
    public modify: any;
    public startEditMapFeature(): void {
        this.isUnableToSelectFeature = true;
        this.modify = new Modify({
            source: this.vectorSource,
            features: this.selectInteraction.getFeatures(),
        });
        this.map.addInteraction(this.modify);
        // Stop the interaction when finished
    }

    /**
     * Removes the interaction of editting a map feature.
     */
    public stopEditMapFeature(): void {
        this.isUnableToSelectFeature = false;
        if (this.modify) { this.map.removeInteraction(this.modify); }
        // Store change in database
    }
}