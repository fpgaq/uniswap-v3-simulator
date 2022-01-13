import { useState, useEffect, useRef, useContext } from 'react'
import {line, area, curveBasis} from 'd3-shape'
import ChartContainer from './ChartContainer'


const genLine = (type, scale, domain) => {

  if (type === 'area') {
    return area()
    .x((d) => { return scale.x(d.x)})
    .y0((d) => { return scale.y(domain.y[0])})
    .y1((d) => { return scale.y(d.y)})
    .curve(curveBasis)
  }
  else {
      return line()
      .x((d) => { return scale.x(d.x)})
      .y((d) => { return scale.y(d.y)})
      .curve(curveBasis);
  }
}

const dataForLine = (props) => {
  return props.data && props.data.length && props.data.length >= 1 && props.scale;
}

export const Lines = (props) => {

  if (dataForLine(props)) {
    const line = genLine(props.lineType, props.scale, props.domain);
    const lines = props.data.map((d, i) => {

      if (props.lineType === 'area') {
        
        return (
          <g key={`area-line-${i}`}>
            <path 
            class={`path-two-${props.uniqueName}`} 
            stroke={ props.colors && props.colors.length ? props.colors[i] : "rgba(238, 175, 246, 0.8)"}
            strokeWidth={ props.strokeWidth ? props.strokeWidth(d, i) : "0.5px"}
            strokeLinecap="round"
            d={line(d)}
            fill={ props.colors && props.colors.length ? props.colors[i] : "rgb(238, 175, 246)" }
            fillOpacity={ props.strokeWidth ? props.fillOpacity(d, i) : 0.3}>
            </path>
          </g>);
      }
      else {
        return (
          <g key={`line-${i}`}>
             <path 
              class={`path-two-${props.uniqueName}`} 
              stroke={ props.colors && props.colors.length ? props.colors[i] : "rgba(238, 175, 246, 0.8)"}
              strokeWidth={ props.strokeWidth ? props.strokeWidth(d, i) : "4px"}
              strokeLinecap="round"
              d={line(d)}
              fill="none"
              strokeOpacity={props.strokeWidth ? props.fillOpacity(d, i) : 0.2}>
            </path>
            <path 
              class={`path-two-${props.uniqueName}`} 
              stroke={ props.colors && props.colors.length ? props.colors[i] : "rgba(238, 175, 246, 0.8)"}
              strokeWidth={ props.strokeWidth ? props.strokeWidth(d, i) : "1px"}
              strokeLinecap="round"
              d={line(d)}
              fill="none"
              strokeOpacity={props.strokeWidth ? props.fillOpacity(d, i) : 0.8}>
            </path> 
          </g>);
      }
    });

    return (<g className={`lines-${props.uniqueName}`}>{lines}</g>);

  }
  else {
    return (<g className={`lines-${props.uniqueName}`} />);
  }
  
}

export const LineChart = (props) => {

  const containerRef = useRef();
  const [scale, setScale] = useState();

  const handleScale = (newScale) => {
    setScale(newScale);
  }

  return (
   <ChartContainer className={props.className} ref={containerRef} data={props.data}
    domain={props.domain} margin={props.margin}
    chartProps={props.chartProps} handleScale={handleScale} currentPriceLine={props.currentPriceLine}
    mouseOverMarker={props.mouseOverMarker} mouseOverText={props.mouseOverText || []} handleMouseOver={props.handleMouseOver}>
      <Lines colors={props.colors} data={props.data} 
        scale={scale} domain={props.domain}
        margin={props.margin || {top: 20, right: 30, bottom: 30, left: 70}} lineType={props.lineType}
        strokeWidth={props.strokeWidth} fillOpacity={props.fillOpacity}>
      </Lines>
      {props.children}
   </ChartContainer>
  );

}