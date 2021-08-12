import React, { useState } from "react";
import "./styles.css";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-55)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

function colorSelect(num) {
  if (num === 0) {
    return "white";
  } else if (num <= 50) {
    return "#2b9348";
  } else if (num <= 100) {
    return "#80b918";
  } else if (num <= 200) {
    return "#ffff3f";
  } else if (num <= 300) {
    return "#dda15e";
  } else if (num <= 400) {
    return "#fd520b";
  } else if (num <= 500) {
    return "#d7263d";
  }
  return "#6b0504";
}

export default function BarCharts({ main }) {
  const cityData = Object.keys(main).map((key) => {
    return {
      name: key,
      aqi: Math.round(main[key].aqi)
    };
  });

  return (
    <div className="bar-container">
      <BarChart width={1000} height={250} data={cityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="aqi" stroke="#000000">
          {cityData.map((entry, index) => (
            <Cell key={index} fill={colorSelect(entry.aqi)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
