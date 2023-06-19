import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { H1 } from "@/Components/ui/Typography";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { circle } from "@turf/turf";

export default function Dashboard({ auth }: PageProps) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<Map | null>(null);
	const [lng, setLng] = useState(0);
	const [lat, setLat] = useState(0);
	const [zoom, setZoom] = useState(1);

	useEffect(() => {
		if (map.current) return;
		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [lng, lat],
				zoom: zoom,
			});

			const geolocate = new mapboxgl.GeolocateControl({
				fitBoundsOptions: {
					maxZoom: 12,
				},
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
			});

			map.current.addControl(geolocate);
			map.current.on("load", () => {
				geolocate.trigger();
			});
			geolocate.once("geolocate", (event) => {
				const { latitude, longitude } = (event as GeolocationPosition)
					.coords;

				if (map.current) {
					map.current.addSource("catch_range", {
						type: "geojson",
						data: circle([longitude, latitude], 1),
					});
					console.log("ASdasd");

					map.current.addLayer({
						id: "catch_range",
						type: "line",
						source: "catch_range",
						paint: {
							"line-color": "blue",
							"line-width": 3,
						},
					});
				}
			});
		}
	}, []);

	return (
		<AuthenticatedLayout>
			<Head title="Dashboard" />

			<div className="container py-10">
				<H1 className="mb-10">Dashboard</H1>
				<div className="grid sm:grid-cols-2 gap-6">
					<div
						ref={mapContainer}
						className="h-[300px] sm:h-[600px] rounded-xl"
					/>
					<div>Hello</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
