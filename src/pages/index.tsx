import React, {FC, useState} from 'react'
import Layout from '@/components/Layout'
import {Cities, CitiesProps} from "@/components/Cities";
import {getCities, populateCityForecast} from "@/lib/cities";

export type HomeProps = {
    cities: CitiesProps['cities']
}

const HomePage: FC<HomeProps> = ({cities}) => {
    return (
        <Layout>
            <div>
                <h1>Cities</h1>
                <main>
                    <Cities cities={cities}/>
                </main>
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const cities = await getCities()

    const citiesWithForecast = await Promise.all(cities.map(async city => {
        return await populateCityForecast(city)
    }))


    return {
        props: {
            cities: citiesWithForecast
        },
    }
}

export default HomePage
