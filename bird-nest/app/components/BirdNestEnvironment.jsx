
import plotStyles from '~/styles/PlotStyles.css'
import React, { useState, useRef, useEffect } from "react";
import { useLoaderData } from '@remix-run/react';

import {
  arc,
  select,
  line,
  axisBottom,
  axisRight,
  min,
  max,
  scaleLinear,
} from "d3";


//const data = [10, 20 ,30, 40, 50]

const BirdNestEnvironment = (props) => {
 const loaderData = useLoaderData()
// console.log(loaderData)
  //Constants
  const MIN_X_COORD = 0
  const MIN_Y_COORD = 0
  const MAX_X_COORD = 500000
  const MAX_Y_COORD = 500000
  const ORIGIN = 250000
  const MONITOR_LENGTH = 500
  const NO_FLY_RADIUS = 100

  //Get info for plotting - info of violating drones
    const data = props.data;

  //Select the element containing the plot
  const svgRef = useRef();

  //For loading the plot with data once
  useEffect(() => {
    //render the plot with current data
    const svg = select(svgRef.current);

    //Configure x and y scale for plotting
    const xScale = scaleLinear()
    .domain([MIN_X_COORD,MAX_X_COORD])
    .range([0,MONITOR_LENGTH])

    const yScale = scaleLinear()
    .domain([MIN_Y_COORD,MAX_Y_COORD])
    .range([MONITOR_LENGTH, 0])

    svg
      .append("rect")
      .attr("class","monitored-field")
      .attr("height",`${MONITOR_LENGTH}`)
      .attr("width",`${MONITOR_LENGTH}`)
      .attr("stroke", "black")
      .attr("fill", "#32a89a")
      .style("stroke-width", "2px");

    svg
      .append("circle")
      .attr("class", "no-drone-zone")
      .attr(
        "transform",
        `translate(${MONITOR_LENGTH / 2},${MONITOR_LENGTH/2})`
      )
      .attr('r', `${NO_FLY_RADIUS}`)
      .attr("stroke", "black")
      .attr("fill", "#3285a8")
      .style("stroke-width", "2px");

    svg
      .append("circle")
      .attr("class", "no-drone-zone")
      .attr(
        "transform",
        `translate(${xScale(ORIGIN)},${yScale(ORIGIN)})`
      )
      .attr('r', "3px")
      .attr("stroke", "black")
      .attr("fill", "black")
      .style("stroke-width", "2px");
    

  }, [data]);


  return (
    <div className="image">
      
      <svg ref={svgRef}
      
      viewBox="-100 0 1600 300"></svg>
    </div>
  );
};
export default BirdNestEnvironment;

export function links() {
  return [{ rel: 'stylesheet', href: plotStyles }];
}


