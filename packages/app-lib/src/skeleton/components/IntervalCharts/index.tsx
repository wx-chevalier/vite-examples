// import DataSet from '@antv/data-set';
import { AxisGrid, AxisLabel, AxisTitle, Styles } from '@antv/g2/src';
import {
  Axis,
  Chart,
  Coord,
  Geom,
  GeomType,
  Legend,
  MarkerType,
  PositionType,
  Tooltip,
} from 'bizcharts';
import * as React from 'react';

export interface IIntervalChartsProps {
  geomType1: GeomType;
  geomType2?: GeomType;
  height: number;
  dv: any;
  scale?: any;
  transpose?: boolean;
  axisX: string;
  axisY: string;
  axisR?: string;
  padding: any;
  color: any;
  geomColor?: any;
  geomOpacity?: number;
  geomShape?: string;
  geomTooltip?: any;
  geomTooltip2?: any;
  offsetX?: number;
  offsetY?: number;
  size: number;
  AxisYlable?: AxisLabel;
  lineX?: Styles.line;
  lineY?: Styles.line;
  titleX?: AxisTitle;
  titleY?: AxisTitle;
  titleR?: AxisTitle;
  marker?: string | MarkerType;
  positionX?: PositionType;
  positionY?: PositionType;
  geomPositon?: string;
  legendCustom?: boolean;
  legendItem?: any[];
  gridX?: AxisGrid | null | boolean;
}

const label = {
  rotate: 0,
  autoRotate: false,
  textStyle: { fill: '#748AA1', fontSize: '11' },
};
const grid = { lineStyle: { stroke: '#EBEDF4', lineDash: [0, 0] } };

export class IntervalCharts extends React.PureComponent<IIntervalChartsProps> {
  render() {
    const {
      geomType1,
      height,
      dv,
      scale,
      padding,
      axisX,
      axisY,
      size,
      color,
    } = this.props;

    return (
      <Chart
        height={height}
        forceFit={true}
        data={dv}
        scale={scale}
        padding={padding}
      >
        <Legend
          custom={this.props.legendCustom}
          allowAllCanceled={true}
          position="top-right"
          offsetY={this.props.offsetY}
          offsetX={this.props.offsetX}
          items={this.props.legendItem}
          marker={this.props.marker ? this.props.marker : 'circle'}
        />
        <Axis
          name={axisX}
          label={label}
          grid={this.props.gridX ? grid : null}
          line={this.props.lineX}
          title={this.props.titleX}
          position={this.props.positionX}
        />
        <Axis
          name={axisY}
          label={this.props.AxisYlable ? this.props.AxisYlable : label}
          grid={grid}
          line={this.props.lineY}
          title={this.props.titleY}
          position={this.props.positionY}
        />
        {this.props.axisR ? (
          <Axis
            name={this.props.axisR}
            title={this.props.titleR}
            label={label}
          />
        ) : null}
        <Tooltip showTitle={false} />
        {this.props.transpose ? (
          <Coord transpose={this.props.transpose} />
        ) : null}
        <Geom
          type={geomType1}
          size={size}
          tooltip={this.props.geomTooltip}
          shape={this.props.geomShape}
          opacity={this.props.geomOpacity ? this.props.geomOpacity : 1}
          position={`${axisX}*${axisY}`}
          color={color}
        />
        {this.props.geomType2 ? (
          <Geom
            type={this.props.geomType2}
            size={2}
            opacity={this.props.geomOpacity ? this.props.geomOpacity : 1}
            position={this.props.geomPositon}
            tooltip={this.props.geomTooltip2}
            color={this.props.geomColor ? this.props.geomColor : color}
          />
        ) : null}
      </Chart>
    );
  }
}
