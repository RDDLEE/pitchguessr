"use client";

import React from "react";

import Floater from "./Floater/Floater";

const NUM_FLOATERS = 35;

const MIN_SIZE = 5;
const MAX_SIZE = 15;

const MIN_DURATION = 8;
const MAX_DURATION = 40;

export default function FloaterContainer() {
  const generateDuration = (size: number): number => {
    return MIN_DURATION + (size / MAX_SIZE) * (MAX_DURATION - MIN_DURATION);
  };

  const generateDelay = (): number => {
    return Math.random() * 15;
  };

  const generateX = (num: number): number => {
    return num * (95 / NUM_FLOATERS);
  };

  const generateSize = (): number => {
    return Math.max(MIN_SIZE, Math.random() * MAX_SIZE);
  };

  const renderFloaters = (): JSX.Element[] => {
    const floaters = [];
    for (let i = 0; i < NUM_FLOATERS; i++) {
      const size = generateSize();
      floaters.push((
        <Floater x={generateX(i)} size={size} duration={generateDuration(size)} initialDelay={generateDelay()} />
      ));
    }
    return floaters;
  };

  return (
    <div>
      {renderFloaters()}
    </div>
  );
}
