import {FC} from "react";
import Link from "next/link";
import {Forecast} from ".prisma/client";

export type ForecastsProps = {
    forecasts: { [date: string]: Forecast[] }
}
export const Forecasts: FC<ForecastsProps> = ({forecasts}) => {
    return (
        <ul>
            {Object.entries(forecasts).map(([date, forecasts]) => (
                <li key={date}>
                    <b>{date}</b>
                    {forecasts.map((forecast) =>
                        <div key={forecast.id} className={"card"}>
                            <div className={"card-header"}>
                                {forecast.dt.getHours()}:{forecast.dt.getMinutes() > 10 ? forecast.dt.getMinutes() : "0" + forecast.dt.getMinutes()}
                            </div>
                            <div className={"card-body"}>
                                <span>Temp: {forecast.temp}°C</span>
                                <span>Humidity: {forecast.humidity}</span>
                            </div>
                        </div>
                    )}
                </li>
            ))}

            <style jsx>{`
              ul {
                list-style: none;
                padding: 0;
                display: flex;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
              }

              li {
                margin: 5px;
                scroll-snap-align: start;
              }

              .card-body {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .card-body span {
                font-size: 0.8rem;
                padding: 2px 0;
              }
            `}</style>
        </ul>
    )
}