import React from 'react';
import { withParentSize } from '@vx/responsive';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath, AreaClosed, Bar, Line } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';

class Chart extends React.Component {
  render() {
    const {
      data,
      parentWidth,
      parentHeight,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      showTooltip,
      hideTooltip
    } = this.props;

    return <h2>THIS IS A TEST</h2>;
  }
}

export default withParentSize(Chart);
