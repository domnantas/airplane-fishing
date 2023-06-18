import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { H1 } from "@/Components/ui/Typography";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export default function Dashboard({ auth }: PageProps) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<Map | null>(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

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
