import React, { Component } from 'react';
import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import _ from 'lodash';
import { changeNumberOfData } from './utils';

export default class Demo extends Component {

  static displayName = 'BarChartDemo';

  renderCompare = (data) => {
    if (data.length === 2) {
      const offset = data[0].width + 20;
      const labelX = data[1].x + offset;
      const labelY = (data[0].y + data[1].y) / 2;
      const labelValue = (data[0].score - data[1].score).toFixed(1);
      const labelOffset = 7; // Can add to props
      const compareColor = '#9d9d9d'; // Can add to props
      return [
        <g className="recharts-layer recharts-reference-line" key={1}>
          <line stroke={compareColor} strokeDasharray="3 3" fill="none" fillOpacity="1" strokeWidth="1" x1={data[0].x} y1={data[0].y} x2={labelX} y2={data[0].y} className="recharts-reference-line-line"></line>
        </g>,
        <g className="recharts-layer recharts-reference-line" key={2}>
          <line stroke={compareColor} strokeDasharray="3 3" fill="none" fillOpacity="1" strokeWidth="1" x1={data[1].x} y1={data[1].y} x2={labelX} y2={data[1].y} className="recharts-reference-line-line"></line>
        </g>,
        <g className="recharts-layer recharts-reference-line" key={3}>
          <line stroke={compareColor} fill="none" fillOpacity="1" strokeWidth="1" x1={labelX} y1={data[0].y} x2={labelX} y2={data[1].y} className="recharts-reference-line-line"></line>
          <text fill={compareColor} x={labelX + labelOffset} y={labelY} className="recharts-text recharts-label">
            <tspan x={labelX + labelOffset} dy="0.355em">{labelValue}</tspan>
          </text>
        </g>
      ]
    }
    return null;
  }

  render() {
    const dataSpock = [
      {name: 'Nhân viên', score: 2.0},
      {name: 'Công ty', score: 2.6}
    ];
    const colorSpock = ['#9d9d9d', '#dadada']
    return (
      <div className="bar-charts">
        <p>Spock chart</p>
        <div className="bar-chart-wrapper">
        <BarChart width={400} height={300} data={dataSpock}
          margin={{top: 5, right: 5, left: 5, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis
            ticks={[1, 2, 3]}
            tickCount={10}
          />
          <Bar dataKey="score"
            fill="#82ca9d"
            barSize={30}
            background={false}
            label={{ fill: '#9d9d9d', fontSize: 16, position: 'top' }} 
            renderCompare={this.renderCompare}
          >
            {
              dataSpock.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorSpock[index]}/>
              ))
            }
          </Bar>
          </BarChart>
        </div>
      </div>
    );
  }
}
