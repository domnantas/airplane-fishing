import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { H1 } from "@/Components/ui/Typography";
import mapboxgl, { GeoJSONSource, Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { circle, featureCollection, point } from "@turf/turf";
import { getAirplanes } from "@/Api/openSkyNetwork";

export default function Dashboard({ auth }: PageProps) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<Map | null>(null);
	const [currentPosition, setCurrentPosition] = useState<number[] | null>(
		null
	);

	useEffect(() => {
		if (map.current) return;
		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v12",
				zoom: 1,
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
				if (!map.current) return;
				const { latitude, longitude } = (event as GeolocationPosition)
					.coords;

				setCurrentPosition([longitude, latitude]);

				map.current.addSource("catch_range", {
					type: "geojson",
					data: circle([longitude, latitude], 1),
				});

				map.current.addLayer({
					id: "catch_range",
					type: "line",
					source: "catch_range",
					paint: {
						"line-color": "blue",
						"line-width": 3,
					},
				});

				getAirplanes({
					minLatitude: latitude - 2,
					maxLatitude: latitude + 2,
					minLongitude: longitude - 2,
					maxLongitude: longitude + 2,
				}).then((airplanes) => {
					if (!map.current) return;

					const airplaneCollection = featureCollection(
						airplanes.map((airplane) =>
							point([airplane[5], airplane[6]], {
								track: airplane[10],
							})
						)
					);

					map.current.addSource("airplanes", {
						type: "geojson",
						data: airplaneCollection,
					});

					map.current.addLayer({
						id: "airplanes",
						type: "symbol",
						source: "airplanes",
						layout: {
							"icon-image": "airport",
							"icon-allow-overlap": true,
							"icon-rotate": ["get", "track"],
							"icon-rotation-alignment": "map",
						},
					});
				});
			});

			// Update the catch circle when position changes
			geolocate.on("geolocate", (event) => {
				if (!map.current || !currentPosition) return;
				const { latitude, longitude } = (event as GeolocationPosition)
					.coords;

				setCurrentPosition([longitude, latitude]);

				const catchRangeSource = map.current.getSource(
					"catch_range"
				) as GeoJSONSource;

				catchRangeSource.setData(circle([longitude, latitude], 1));
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
					<div>hello</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
