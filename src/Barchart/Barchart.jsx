import React from 'react'
import Chart from "react-apexcharts";

export default function Barchart({summaries}) {
    const dates = Object.keys(summaries);
    const prices = Object.values(summaries);  
    return (
    <>
        <Chart
                type="bar"
                width={1000}
                height={450}
                series={[
                {
                    name: "Income today",
                    data: prices,
                },
                ]}
                options={{
                title: {
                    text: "Total Income Per Day",
                    style: { fontSize: 30 },
                },
                colors: ["#242424"],
                theme: { mode: "light" },
                xaxis: {
                    tickPlacement: "on",
                    categories: dates,
                    title: {
                    text: "Payment Date",
                    style: { color: "#242424", fontSize: 15 },
                    },
                },
                yaxis: {
                    labels: {
                    formatter: (val) => {
                        return `${val}`;
                    },
                    style: { fontSize: "15", colors: ["#242424"] },
                    },
                    title: {
                    text: "Total Income",
                    style: { color: "#242424", fontSize: 15 },
                    },
                    min: 0, 
                    max: 200,      
                    forceNiceScale: true,
                }
                }}
            />
    </>
    );
}
