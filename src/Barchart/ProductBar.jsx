import React from 'react';
import Chart from 'react-apexcharts';

export default function ProductBar({ orderNameCount }) {
  const orderNames = orderNameCount.map(item => item.name);
  const counts = orderNameCount.map(item => item.count);

  return (
    <>
      <Chart
        type="bar"
        width={1000}
        height={450}
        series={[
          {
            name: "Order Count",
            data: counts,
          },
        ]}
        options={{
          title: {
            text: "Order Count Per Product",
            style: { fontSize: 30 },
          },
          colors: ["#242424"],
          theme: { mode: "light" },
          xaxis: {
            tickPlacement: "on",
            categories: orderNames,
            title: {
              text: "Order Name",
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
              text: "Order Count",
              style: { color: "#242424", fontSize: 15 },
            },
            tickAmount: 5,  // Adjust the tick amount
          },
        }}
      />
    </>
  );
}
