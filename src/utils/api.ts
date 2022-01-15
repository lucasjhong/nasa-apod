import axios from 'axios';

const apiKey = 'wHJeZHyfPT5XQrjHbU6zRTrwwQyOtPjphrjDPM2D';

const instance = axios.create({
	baseURL: `https://api.nasa.gov/planetary/apod/`,
	// timeout: 20000,
	params: {
		api_key: apiKey,
	},
});

export const Post = {
	getRandom: (count: number = 24): Promise<any[]> =>
		instance.get(`?count=${count}`).then((res) => res.data),
	getSelect: (dateStart: string, dateEnd: string) =>
		instance.get(`?start_date=${dateStart}&end_date=${dateEnd}`).then((res) => res.data),
};
