import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    TimeScale,
    TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { enGB } from "date-fns/locale";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    TimeScale,
    TimeSeriesScale
);

export interface MarketChartGraphProps {
    marketCaps: MarketQuote[];
    prices: MarketQuote[];
}
export type MarketQuote = [Date, number];

export const MarketChartGraph: React.FC<MarketChartGraphProps> = ({
    marketCaps,
    prices,
}) => {
    const data = {
        labels: prices.map((p) => new Date(p[0])),
        datasets: [
            {
                fill: true,
                label: "USD$",
                data: prices.map((p) => p[1]),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {},
        scales: {
            x: {
                adapters: {
                    date: { locale: enGB },
                    type: "time",
                    distribution: "linear",
                    time: {
                        unit: "day",
                    },
                    title: {
                        display: true,
                        text: "Date",
                    },
                },
            },
        },
    };

    return <Line options={options} data={data} />;
};
