import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line
} from "recharts";

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

export default function City({ currentCity, history }) {
  const data = history.slice(-9).map((item) => ({
    aqi: Math.round(item)
  }));
  const current = Math.round(history.slice(-1));

  return (
    <div className="city-container">
      <h1>{currentCity}</h1>
      <LineChart
        width={1000}
        height={350}
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
        style={{
          backgroundColor: "black"
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[current - 15, current + 15]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="aqi"
          stroke={colorSelect(history.slice(-1))}
        />
      </LineChart>
    </div>
  );
}
