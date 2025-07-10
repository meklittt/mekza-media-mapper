"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import mapboxgl, {
  GeoJSONSource,
  LngLatBoundsLike,
  LngLatLike,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MediaLocation } from "@/lib/airtable/types";
import { CameraIcon } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const DEFAULT_CENTER = [-98.5795, 39.8283] as LngLatLike;
const DEFAULT_ZOOM = 5;

// Custom screenshot control class
class ScreenshotControl {
  private map: mapboxgl.Map | undefined;
  private container: HTMLDivElement | undefined;

  onAdd(map: mapboxgl.Map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    this.container.style.marginTop = "10px";

    const button = document.createElement("button");
    button.className = "mapboxgl-ctrl-icon";
    button.type = "button";
    button.title = "Take screenshot";
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
        <circle cx="12" cy="13" r="3"/>
      </svg>
    `;

    button.addEventListener("click", () => {
      this.takeScreenshot();
    });

    this.container.appendChild(button);
    return this.container;
  }

  onRemove() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
  }

  takeScreenshot() {
    if (!this.map) return;

    const canvas = this.map.getCanvas();
    const dataURL = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.download = `map-screenshot-${
      new Date().toISOString().split("T")[0]
    }.png`;
    link.href = dataURL;
    link.click();
  }
}

export function Map({ data }: { data: MediaLocation[] }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Grab the idea of the selected media point from the URL
  const searchParams = useSearchParams();
  const mediaPointId = searchParams.get("mediaPointId");

  // Find the selected media point in the data
  const selectedMediaPoint = mediaPointId
    ? data.find((point) => point.id === mediaPointId)
    : null;

  /** =============================================== */
  /** Initialize the map */
  /** =============================================== */
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      preserveDrawingBuffer: true, // has to be set to true for screenshot to work
    });

    // Add navigation controls (zoom in/out and rotation)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Handle map load
    map.current.on("load", () => {
      setIsMapLoaded(true);
    });

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  /** =============================================== */
  /** Add spatial data to the map */
  /** =============================================== */
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const geojson = {
      type: "FeatureCollection",
      features: data.map((point) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.longitude, point.latitude],
        },
        properties: {
          ...point,
        },
      })),
    };

    const existingSource = map.current.getSource("media-points");

    if (existingSource) {
      (existingSource as GeoJSONSource).setData(
        geojson as GeoJSON.FeatureCollection
      );
    } else {
      map.current.addSource("media-points", {
        type: "geojson",
        data: geojson as GeoJSON.FeatureCollection,
      });
    }

    const existingLayer = map.current.getLayer("media-points-layer");

    if (!existingLayer) {
      map.current.addLayer({
        id: "media-points-layer",
        type: "circle",
        source: "media-points",
        paint: {
          "circle-radius": 8,
          "circle-color": "#4264fb",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.current.fitBounds(
        geojson.features.map((f) => f.geometry.coordinates) as LngLatBoundsLike
      );
    }

    // Add click interaction
    map.current.on("click", "media-points-layer", (e) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const props = feature.properties;
      // const coordinates = props?.coordinates;

      if (props && props.id) {
        window.history.pushState({}, "", `?mediaPointId=${props.id}`);
        // router.push(`?mediaPointId=${props.id}`);
      }
    });

    // Change cursor on hover
    map.current.on("mouseenter", "media-points-layer", () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "pointer";
      }
    });

    map.current.on("mouseleave", "media-points-layer", () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "";
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        if (map.current.getLayer("media-points-layer")) {
          map.current.removeLayer("media-points-layer");
        }
        if (map.current.getSource("media-points")) {
          map.current.removeSource("media-points");
        }
      }
    };
  }, [isMapLoaded, data]);

  /** =============================================== */
  /** Pan the map to the selected media point
   *
   * Also, change the color and radius of the selected media point
   */
  /** =============================================== */
  useEffect(() => {
    if (!map.current || !isMapLoaded || !selectedMediaPoint) return;

    map.current.flyTo({
      center: [selectedMediaPoint.longitude, selectedMediaPoint.latitude],
    });

    map.current.setPaintProperty("media-points-layer", "circle-color", [
      "case",
      ["==", ["get", "id"], mediaPointId],
      "#15cc09",
      "#4264fb",
    ]);

    map.current.setPaintProperty("media-points-layer", "circle-radius", [
      "case",
      ["==", ["get", "id"], mediaPointId],
      12,
      8,
    ]);
  }, [selectedMediaPoint, isMapLoaded]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-26 shadow-lg rounded-sm right-2 z-10 bg-white w-8 h-8 flex items-center justify-center cursor-pointer">
        <CameraIcon
          onClick={() => {
            const canvas = map.current?.getCanvas();
            const dataURL = canvas?.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL || "";
            const timestamp = new Date().toISOString().split("T")[0];
            link.download = `map-screenshot-${timestamp}.png`;
            link.click();
          }}
        />
      </div>
    </div>
  );
}
