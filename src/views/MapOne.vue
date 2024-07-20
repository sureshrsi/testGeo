<template>
  <div>
    <!-- <ion-menu content-id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu Content</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <CustomLayerSwitcher :layers="layers" />
        </ion-content>
       
      </ion-menu> -->

    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-buttons slot="start">
            <ion-back-button default-href="/main" />
          </ion-buttons>
          <ion-title>
            <!-- <ion-img :src="imageSrc"> </ion-img> -->
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div id="map" class="map"></div>
      </ion-content>
    </ion-page>
  </div>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonMenuButton,
  IonTitle,
  IonBackButton,
  IonImg,
} from "@ionic/vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
// import LayerSwitcher from "ol-layerswitcher";
import { transform } from "ol/proj";

export default {
  data() {
    return {
      layers: [],
      map: null,
      overlay: null,
      featureInfo: null,
      legendUrl: null,
    };
  },
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonImg,
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      let base_url = "https://solaris-ar.com:8085/geoserver";

      const baseLayer = new TileLayer({
        title: "OpenStreetMap",
        type: "base",
        visible: true,
        source: new OSM(),
      });

      const CropSuitabilityLayer = new TileLayer({
        title: "Arunachal_boundary",
        name: "arunachal_boundary",
        visible: true,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_grid_10k",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const layerGroup = new LayerGroup({
        title: "All Layers",
        layers: [baseLayer, CropSuitabilityLayer],
      });

      const view = new View({
        center: transform([95.97135, 27.66894], "EPSG:4326", "EPSG:3857"),
        zoom: 9.5,
        // minZoom: 10.5,
        maxZoom: 18,
      });

      this.map = new Map({
        target: "map",
        layers: [layerGroup],
        view: view,
      });

      // Save the layers to data for passing to the custom layer switcher
      this.layers = [baseLayer, CropSuitabilityLayer];

      // Add click event listener to the map
      this.map.on("singleclick", this.getTopMostMapClick);
      this.updateLegend();
      // const layerSwitcher = new LayerSwitcher({
      //   activationMode: "click",
      //   startActive: false,
      //   tipLabel: "Layers", // Optional label for button
      //   groupSelectStyle: "children", // Can be 'children' [default], 'group' or 'none'
      //   target: document.getElementById("layer-switcher"),
      // });

      // map.addControl(layerSwitcher);

      // const customControl = new CustomLayerSwitcherControl({
      //   target: document.getElementById("layer-switcher"),
      // });

      // map.addControl(customControl);
    },
    handleMapClick(event) {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const source = this.layers[2].getSource(); // Assuming the WMS layer is the third layer

      const url = source.getFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        view.getProjection(),
        { INFO_FORMAT: "application/json" }
      );

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              const feature = data.features[0];
              this.featureInfo = {
                soil_code: feature.properties.soil_code,
                action_pla: feature.properties.action_pla,
              };
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
          });
      }
    },
    updateLegend() {
      // Iterate through flattened layers from top to bottom to find the topmost visible layer
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const layer = this.layers[i];
        if (layer.getVisible() && layer.getSource().getLegendUrl) {
          const legendUrl = layer.getSource().getLegendUrl();
          this.legendUrl = legendUrl;
          break; // Stop after the first visible layer with a legend
        }
      }
    },
    getTopMostMapClick(event) {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();

      // Iterate through flattened layers from top to bottom to find the topmost visible layer with getFeatureInfoUrl
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const layer = this.layers[i];
        if (
          layer.getVisible() &&
          typeof layer.getSource().getFeatureInfoUrl === "function"
        ) {
          const url = layer
            .getSource()
            .getFeatureInfoUrl(event.coordinate, viewResolution, projection, {
              INFO_FORMAT: "application/json",
            });

          if (url) {
            // console.log("top most url", url);
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                if (data.features && data.features.length > 0) {
                  const feature = data.features[0];
                  this.featureInfo = feature.properties;
                  this.isFeatureInfoOpen = true;
                } else {
                  this.featureInfo = null;
                }
              })
              .catch((error) => {
                console.error("Error fetching feature info:", error);
                this.featureInfo = null;
              });
            break; // Stop after the first visible layer with feature info
          }
        }
      }
    },
  },
  watch: {
    // Watch for changes in layer visibility to update the legend
    layers: {
      handler: "updateLegend",
      deep: true,
    },
  },
};
</script>

<style scoped>
ion-menu::part(backdrop) {
  background-color: rgba(255, 0, 255, 0.5);
}

ion-menu::part(container) {
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}

.map {
  height: 100%;
  width: 100%;
}
</style>
