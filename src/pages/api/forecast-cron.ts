import {NextApiRequest, NextApiResponse} from "next";
import {getCities} from "@/lib/cities";
import {cleanOldForecasts, pullFiveDayForecast, saveForecastDays} from "@/lib/forecasts";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const cities = await getCities();
    const date = new Date();

    const results = await Promise.all(cities.map(async (city) => {
        const forecasts = await pullFiveDayForecast(city.city_lat, city.city_lag);
        await saveForecastDays(city.city_id, forecasts);
        return {city, forecasts}
    }));

    await cleanOldForecasts(date);

    res.status(200).json(results);
}