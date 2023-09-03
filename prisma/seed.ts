import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

const cityData: Prisma.CityCreateInput[] = [
    {
        city_name: 'New York',
        city_timeZone: 'America/New_York',
        city_lat: 40.7128,
        city_lag: -74.0060,
        forecasts: {
            create: [
                {
                    dt: new Date(),
                    temp: 70,
                    temp_min: 65,
                    temp_max: 75,
                    humidity: 50,
                },
            ],
        },
    },
    {
        city_name: "Los Angeles",
        city_timeZone: "America/Los_Angeles",
        city_lat: 34.0522,
        city_lag: -118.2437,
        forecasts: {
            create: [
                {
                    dt: "2023-04-01T00:00:00.000Z",
                    temp: 75,
                    temp_min: 70,
                    temp_max: 80,
                    humidity: 40
                }
            ]
        }
    },
    {
        city_name: "London",
        city_timeZone: "Europe/London",
        city_lat: 51.5074,
        city_lag: -0.1278,
        forecasts: {
            create: [
                {
                    dt: "2023-04-01T00:00:00.000Z",
                    temp: 55,
                    temp_min: 50,
                    temp_max: 60,
                    humidity: 70
                }
            ]
        }
    }
];

async function main() {
    console.log('Start seeding ...');
    for (const c of cityData) {
        const city = await prisma.city.create({
            data: c,
        });
        console.log(`Created city with id: ${city.city_id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });