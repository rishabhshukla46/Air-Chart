import React from "react";

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

function updateSet(dateObj) {
  const dateNow = new Date();
  const diffrence = (dateNow.getTime() - dateObj.getTime()) / 1000;

  return `${diffrence.toFixed(0)} seconds ago`;
}

export default function Board({ main, cityChange }) {
  function Entry(item, key) {
    return (
      <div
        className="board-entry"
        style={{
          backgroundColor: `${colorSelect(item.aqi)}`,
          opacity: `${item.aqi ? 1 : 0.3}`
        }}
        id={key}
      >
        <div className="city-name" onClick={() => cityChange(item.city)}>
          {item.city}
        </div>
        <div className="city-aqi">
          {item.aqi === 0 ? "No Data" : item.aqi.toFixed(2)}
        </div>
        <div className="last-updated">
          {item.aqi === 0 ? "" : updateSet(item.lastUpdated)}
        </div>
      </div>
    );
  }
  return (
    <div className="board-container">
      <div className="board-entry-main">
        <div className="city-name-main">City</div>
        <div className="city-aqi-main">AQI Index</div>
        <div className="last-updated-main">Last Updated</div>
      </div>
      {Object.keys(main).map((item) => {
        return Entry(
          {
            city: item,
            aqi: main[item].aqi,
            lastUpdated: main[item].lastUpdated
          },
          item
        );
      })}
    </div>
  );
}
