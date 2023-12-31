import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { H1, H2 } from "@/Components/ui/Typography";
import mapboxgl, { GeoJSONSource, Map } from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	circle,
	featureCollection,
	point,
	pointsWithinPolygon,
} from "@turf/turf";
import { getAirplanes } from "@/Api/openSkyNetwork";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/Components/ui/Card";
import { Button } from "@/Components/ui/Button";

export default function Dashboard({ auth }: PageProps) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<Map | null>(null);
	const [currentPosition, setCurrentPosition] = useState<number[] | null>(
		null
	);
	const [catchRange, setCatchRange] = useState(null);
	const [airplanes, setAirplanes] = useState(null);

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

				map.current?.loadImage("/airplane.png", (error, image) => {
					if (error) throw error;
					if (!image) return;

					map.current?.addImage("airplane", image, { sdf: true });
				});
			});

			geolocate.once("geolocate", (event) => {
				if (!map.current) return;
				const { latitude, longitude } = (event as GeolocationPosition)
					.coords;

				setCurrentPosition([longitude, latitude]);

				const catchRangeCircle = circle([longitude, latitude], 2);
				setCatchRange(catchRangeCircle);

				map.current.addSource("catch_range", {
					type: "geojson",
					data: catchRangeCircle,
				});

				map.current.addLayer({
					id: "catch_range",
					type: "line",
					source: "catch_range",
					paint: {
						"line-color": "#1ca1f2",
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
								callsign: airplane[1],
								origin: airplane[2],
								track: airplane[10],
							})
						)
					);

					setAirplanes(airplaneCollection);

					map.current.addSource("airplanes", {
						type: "geojson",
						data: airplaneCollection,
					});

					map.current.addLayer({
						id: "airplanes",
						type: "symbol",
						source: "airplanes",
						layout: {
							"icon-image": "airplane",
							"icon-allow-overlap": true,
							"icon-rotate": ["get", "track"],
							"icon-rotation-alignment": "map",
						},
						paint: {
							"icon-color": "#ffffff",
							"icon-halo-width": 3,
							"icon-halo-color": "#000000",
							"icon-halo-blur": 2,
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

	const airplanesInRange = useMemo(() => {
		if (!airplanes || !catchRange) return;
		return pointsWithinPolygon(airplanes, catchRange);
	}, [airplanes, catchRange]);

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
					<div>
						<H2 className="mb-4">In range</H2>
						{airplanesInRange?.features.length
							? airplanesInRange.features.map((airplane) => (
									<Card>
										<CardHeader>
											<CardTitle>
												{airplane.properties.callsign}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<b>Origin:</b>{" "}
											{airplane.properties.origin}
										</CardContent>
										<CardFooter>
											<Button className="w-full text-2xl font-bold">
												Catch!
											</Button>
										</CardFooter>
									</Card>
							  ))
							: "No airplanes in range"}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
