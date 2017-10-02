import React from 'react';
import { withParentSize } from '@vx/responsive';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Bar, Line } from '@vx/shape';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';
import formatDate from '../utils/formatDate';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    const {
      parentWidth,
      parentHeight,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      showTooltip,
      hideTooltip,
      data
    } = this.props;
    //Fallback if data is unavailble
    if (data.length === 0) {
      return <h2>Enter some tips!!</h2>;
    }
    //Set some margins for our graph
    const margin = {
      top: 15,
      bottom: 20,
      left: 0,
      right: 50
    };

    const bisectDate = bisector(d => x(d)).right;
    //The variables parentWidth and parentHeight are passed in via HOC withParentSize, provided by VX.
    //This will allow us to keep our graph responsive on smaller screens while maintaining margins.
    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    //Accessors for VX
    const x = data => data.date;
    const y = data => data.tipAmount;

    //Let's grab the minimum and maximum tip values from out data.  We make handy use
    //of the es6 spread operator to pass in mapped values to our Math functions based
    //on the accessors we wrote above.
    const maxTip = Math.max(...data.map(y));
    const minDate = Math.min(...data.map(x));
    const maxDate = Math.max(...data.map(x));
    const firstPoint = data[0];
    const currentPoint = data[data.length - 1];
    const maxTipData = [
      {
        date: x(firstPoint),
        tipAmount: maxTip
      },
      {
        date: x(currentPoint),
        tipAmount: maxTip
      }
    ];

    //Create the scales to be used for the charts' axes.
    const xScale = scaleTime({
      range: [25, width],
      domain: [minDate, maxDate]
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [0, maxTip + 50]
    });

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={parentHeight}>
          <AxisBottom
            data={data}
            scale={xScale}
            x={x}
            numTicks={6}
            top={yScale(0)}
            hideTicks
            tickLabelProps={() => ({
              fontFamily: 'Arial',
              fontSize: 10,
              fill: 'white',
              dx: '-1.3em'
            })}
          />
          <AxisLeft
            data={data}
            scale={yScale}
            y={y}
            numTicks={4}
            hideTicks
            left={25}
            tickLabelProps={() => ({
              fontFamily: 'Arial',
              fontSize: 10,
              fill: 'white',
              dx: '-1em'
            })}
          />
          <LinearGradient
            id="area-fill"
            from="#FFF"
            to="#FFF"
            fromOpacity={0.8}
            toOpacity={0.1}
          />
          {data.map((d, i) => {
            const barHeight = height - yScale(y(d));
            return (
              <Bar
                key={i}
                width={width / 35}
                height={barHeight}
                x={xScale(x(d))}
                y={height - barHeight}
                data={{ x: x(d), y: y(d) }}
                fill="url(#area-fill)"
              />
            );
          })}
          <Bar
            data={data}
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={data => event => {
              const { x: xPoint } = localPoint(this.svg, event);
              const x0 = xScale.invert(xPoint);
              const index = bisectDate(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];
              const d = x0 + xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0;
              showTooltip({
                tooltipLeft: xScale(x(d)),
                tooltipTop: yScale(y(d)),
                tooltipData: d
              });
            }}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: yScale(y(maxTipData[0])) }}
                to={{ x: tooltipLeft, y: yScale(0) }}
                stroke="#ffffff"
                strokeDasharray="2,2"
              />
              <circle
                r="8"
                cx={tooltipLeft}
                cy={tooltipTop}
                fill="#00f1a1"
                fillOpacity={0.4}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                r="4"
                cx={tooltipLeft}
                cy={tooltipTop}
                fill="#00f1a1"
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 36}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: '#6086D6',
                color: 'white'
              }}
            >
              {y(tooltipData)}
            </Tooltip>
            <Tooltip
              left={tooltipLeft + 12}
              top={yScale(0)}
              style={{
                transform: 'translateX(-50%)'
              }}
            >
              {formatDate(x(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}

export default withParentSize(withTooltip(Chart));
