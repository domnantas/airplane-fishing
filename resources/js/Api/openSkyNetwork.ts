import axios from "axios";

export const getAirplanes = ({
	minLatitude,
	maxLatitude,
	minLongitude,
	maxLongitude,
}: {
	minLatitude: number;
	maxLatitude: number;
	minLongitude: number;
	maxLongitude: number;
}) => {
	return axios
		.get("https://opensky-network.org/api/states/all", {
			params: {
				lamin: minLatitude,
				lamax: maxLatitude,
				lomin: minLongitude,
				lomax: maxLongitude,
			},
		})
		.then((response) => response.data.states);
};
