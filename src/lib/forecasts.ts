import prisma from "@/lib/prisma";
import {Forecast} from ".prisma/client";

type ForecastDayData = {
    dt: Date;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
};

export const getFiveDayForecast = async (cityId: number) => {
    return await prisma.forecast.findMany({
        where: {
            city_id: cityId
        },
        orderBy: {
            dt: 'asc'
        },
    });
}

export const groupForecastByDate = (forecasts: Forecast[]) => {
    const forecastByDays: { [date: string]: Forecast[] } = {};

    for (const forecast of forecasts) {
        const date = forecast.dt.toISOString().split('T')[0];

        if (forecastByDays[date]) {
            forecastByDays[date].push(forecast);
        } else {
            forecastByDays[date] = [forecast];
        }
    }

    return forecastByDays;
}

export const pullFiveDayForecast = async (lat: number, lon: number) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=${process.env.NEXT_PUBLIC_DEFAULT_MEASURE_UNIT}`)
    const data = await response.json();
    return mapForecastDays(data.list);
}

export const mapForecastDays = (days: any[]): ForecastDayData[] => {
    return days.map((item) => ({
        dt: new Date(item.dt * 1000),
        temp: item.main.temp,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
    }));
}

export const saveForecastDays = async (cityId: number, days: ForecastDayData[]) => {
    await Promise.all(days.map(async (day) => {
        await prisma.forecast.upsert({
            where: {
                city_id_dt: {
                    city_id: cityId,
                    dt: day.dt
                }
            },
            update: {
                ...day
            },
            create: {
                ...day,
                city_id: cityId
            },
        })
    }))

    return true;
}

export const cleanOldForecasts = async (date: Date) => {
    return await prisma.forecast.deleteMany({
        where: {
            dt: {
                lte: date
            }
        }
    })
}

export const getCurrentForecast = async (lat: number, lon: number) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=${process.env.NEXT_PUBLIC_DEFAULT_MEASURE_UNIT}`)
    return await response.json();
}
