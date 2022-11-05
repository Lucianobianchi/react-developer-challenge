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

type MarketQuote = [number, number];

export interface MarketChartGraphProps {
    marketCaps: MarketQuote[];
    prices: MarketQuote[];
    selection: "price" | "market_cap";
}

export const MarketChartGraph: React.FC<MarketChartGraphProps> = ({
    marketCaps,
    prices,
    selection,
}) => {
    const stats = selection === "price" ? prices : marketCaps;

    const data = {
        labels: stats.map((p) => new Date(p[0])),
        datasets: [
            {
                fill: true,
                data: stats.map((p) => p[1]),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const options = {
        plugins: {},
        scales: {
            x: {
                type: "time" as "time",
                adapters: {
                    date: {
                        locale: enGB,
                    },
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};
