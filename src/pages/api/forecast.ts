import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "@/lib/prisma";
import {getFiveDayForecast, pullFiveDayForecast} from "@/lib/forecasts";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') {
        const cityId = Number(req.query.cityId);

        if (!cityId || isNaN(cityId))
            return res.status(400).end()

        const forecasts = await getFiveDayForecast(cityId);

        return res.status(200).json(forecasts);
    }
    
    return res.status(405).end();
}
