import "./styles.css";
import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Board from "./Board";
import BarCharts from "./BarCharts";
import City from "./City";

const client = new W3CWebSocket("wss://city-ws.herokuapp.com/");

export default function App() {
  const [timer, setTimer] = useState(0);
  const [main, SetMain] = useState({
    Delhi: { aqi: 0, lastUpdated: new Date() },
    Mumbai: { aqi: 0, lastUpdated: new Date() },
    Bengaluru: { aqi: 0, lastUpdated: new Date() },
    Pune: { aqi: 0, lastUpdated: new Date() },
    Hyderabad: { aqi: 0, lastUpdated: new Date() },
    Kolkata: { aqi: 0, lastUpdated: new Date() },
    Indore: { aqi: 0, lastUpdated: new Date() },
    Bhubaneswar: { aqi: 0, lastUpdated: new Date() },
    Chandigarh: { aqi: 0, lastUpdated: new Date() },
    Lucknow: { aqi: 0, lastUpdated: new Date() },
    Jaipur: { aqi: 0, lastUpdated: new Date() },
    Chennai: { aqi: 0, lastUpdated: new Date() }
  });
  const [history, setHistory] = useState({
    Delhi: [],
    Mumbai: [],
    Bengaluru: [],
    Pune: [],
    Hyderabad: [],
    Kolkata: [],
    Indore: [],
    Bhubaneswar: [],
    Chandigarh: [],
    Lucknow: [],
    Jaipur: [],
    Chennai: []
  });
  const [currentCity, setCurrentCity] = useState("Delhi");

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1);
    }, 100);
  }, [timer]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.length) {
        dataFromServer.map((item) => {
          const obj = main;
          const historyObj = history;
          if (obj[item.city]) {
            obj[item.city].aqi = item.aqi;
            obj[item.city].lastUpdated = new Date();
            historyObj[item.city].push(item.aqi);
            SetMain(obj);
            setHistory(historyObj);
          }
        });
      }
    };
  }, [timer]);

  const cityChange = (city) => {
    setCurrentCity(city);
  };

  return (
    <div className="main-container">
      <h1>Air Quality Index</h1>
      <div className="App">
        <Board main={main} cityChange={cityChange} />
        <div className="right-col">
          <BarCharts main={main} />
          <City currentCity={currentCity} history={history[currentCity]} />
        </div>
      </div>
    </div>
  );
}
