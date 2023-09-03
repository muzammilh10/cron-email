import Layout from "@/components/Layout";
import {getCities, getCity} from "@/lib/cities";
import {GetStaticPropsContext} from "next";
import {FC, useState} from "react";
import {City} from ".prisma/client";
import {Forecasts, ForecastsProps} from "@/components/Forecasts";
import {getFiveDayForecast, groupForecastByDate} from "@/lib/forecasts";

export const getStaticPaths = async () => {
    const cities = await getCities()

    const paths = cities.map(city => ({
        params: {
            cityId: city.city_id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
    const cityId = Number(params?.cityId)

    if (!cityId || isNaN(cityId)) {
        return {
            error: "Invalid city id"
        }
    }

    const city = await getCity(cityId)

    if (!city) {
        return {
            notFound: true
        }
    }

    const forecast = groupForecastByDate(await getFiveDayForecast(cityId));

    return {
        props: {
            city,
            forecast
        },
    }
}

export type CityProps = {
    city: City
    forecast: ForecastsProps["forecasts"]
}

const CityPage: FC<CityProps> = ({city, forecast: forecast}) => {

    return (
        <Layout>
            <div>
                <h1>{city.city_name}</h1>
                <main>
                    <Forecasts forecasts={forecast}/>
                </main>
            </div>
        </Layout>
    )
}

export default CityPage;