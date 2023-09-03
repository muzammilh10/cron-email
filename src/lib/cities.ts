import prisma from "@/lib/prisma";
import {getCurrentForecast} from "@/lib/forecasts";
import {City, Forecast} from ".prisma/client";

export const getCities = async () => {
    return prisma.city.findMany()
}

export const getCity = async (id: number) => {
    return prisma.city.findUnique({
        where: {
            city_id: id
        }
    })
}

export type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export const populateCityForecast = async (city: City) => {
    const currentForecast = await getCurrentForecast(city.city_lat, city.city_lag);
    const weather = currentForecast.weather[0] as Weather;
    const forecast = currentForecast.main as Forecast;

    return {
        ...city,
        weather,
        forecast
    }
}