"use client";
import React from "react";
import { HiMiniChartBar } from "react-icons/hi2";
import { BsFillGrid3X2GapFill } from "react-icons/bs";

export default function DisplayType({
  grid = false,
  setBarGraphActive,
  isBarGraphActive = true,
}) {
  const index = isBarGraphActive ? 0 : 1;
  const count = grid ? 2 : 1;
  const width = 100 / count;

  return (
    <div
  className="position-relative d-flex rounded-pill p-2"
  style={{
    background: "var(--progress-secondary)",
    width: grid ? "100px" : "60px",
  }}
>
  {/* Equal-width segments wrapper */}
  <div className="d-flex flex-grow-1 w-100">
    {/* Segment 1 */}
    <div className="center-items flex-grow-1">
      <HiMiniChartBar
        size="1.4rem"
        onClick={() => setBarGraphActive(true)}
        className={`z-1 cursor-pointer ${isBarGraphActive ? "text-dark" : "text-secondary"}`}
      />
    </div>

    {/* Segment 2 */}
    {grid && (
      <div className="center-items flex-grow-1">
        <BsFillGrid3X2GapFill
          size="1.4rem"
          onClick={() => setBarGraphActive(false)}
          className={`z-1 cursor-pointer ${!isBarGraphActive ? "text-dark" : "text-secondary"}`}
        />
      </div>
    )}
  </div>

  {/* SLIDER always on top of the segments */}
  <div
    className="rounded-pill bg-white position-absolute"
    style={{
      top: "4px",
      bottom: "4px",
      left: "4px",
      width: `calc(${100 / (grid ? 2 : 1)}% - 4px)`,
      transform: `translateX(${(isBarGraphActive ? 0 : 1) * 100}%)`,
      transition: "transform 0.3s ease",
      zIndex: 0,
    }}
  />
</div>

  );
}
