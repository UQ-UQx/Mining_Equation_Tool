import React from "react"

import { clearFix } from "polished"
import {
    ResponsiveContainer, 
    ComposedChart, 
    LineChart, 
    Line, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    AreaChart, 
    Area, 
    CartesianGrid, 
    Text
} from 'recharts';
import styles from "./_Styles"
import styled from "styled-components"


export default class ChartsContainerComponent extends React.Component{


    renderPopulationChart(population_data){
        let chart = (<PopulationChart>
                        <ResponsiveContainer>
                            <LineChart width={600} height={300} data={population_data}
                                margin={{ top: 10, right: 10, left: 100, bottom: 50 }}>

                            <XAxis 
                                dataKey="year" 
                                domain={["auto", "auto"]}  
                                label={<XAxisLabel text="Year"/>} 
                                strokeWidth={2} 
                                tickCount={5}
                                tick={<AngledTick />}
                            />
                        
                            <YAxis  
                                dataKey="pop" 
                                domain={[7000000000, 12000000000]} 
                                label={<YAxisLabel padding={50} color={'#41527D'} orientation="left" text="Population"/>}
                                orientation="left" 
                                stroke='#41527D' 
                                strokeWidth={2} 
                                tickFormatter={CommaFormat} 
                                yAxisId="left" 
                            />

                            <Line connectNulls={true} dot={false} yAxisId="left" type="natural" type='linear' dataKey='pop' stroke='#41527D' strokeWidth={3} />
                            
                            </LineChart>
                        </ResponsiveContainer>
                </PopulationChart>) 
        return chart
    }

    renderAffluenceChart(affluence_data){
        let chart = (<AffluenceChart>
                        <ResponsiveContainer>
                            <LineChart width={600} height={300} data={affluence_data}
                                margin={{ top: 10, right: 10, left: 50, bottom: 50 }}>

                            <XAxis 
                                dataKey="year" 
                                domain={[420, 900]}  
                                label={<XAxisLabel text="Year"/>} 
                                strokeWidth={2} 
                                tickCount={5}
                                tick={<AngledTick />}
                            />
                        
                            <YAxis  
                                dataKey="affluence" 
                                domain={[420, 930]} 
                                label={<YAxisLabel padding={5} color={'#41527D'} orientation="left" text="Affluence"/>}
                                orientation="left" 
                                stroke='#41527D' 
                                strokeWidth={2} 
                                tickFormatter={CommaFormat} 
                                yAxisId="left" 
                            />

                            <Line connectNulls={true} dot={false} yAxisId="left" type="natural" type='linear' dataKey='affluence' stroke='#41527D' strokeWidth={3} />
                            
                            </LineChart>
                        </ResponsiveContainer>
                </AffluenceChart>) 
        return chart
    }

    renderTechChart(technology_data){
        let chart = (<TechChart>
                        <ResponsiveContainer>
                            <LineChart width={600} height={300} data={technology_data}
                                margin={{ top: 10, right: 10, left: 50, bottom: 50 }}>

                            <XAxis 
                                dataKey="year" 
                                domain={['auto', 'auto']}  
                                label={<XAxisLabel text="Year"/>} 
                                strokeWidth={2} 
                                tickCount={5}
                                tick={<AngledTick />}
                            />
                        
                            <YAxis  
                                dataKey="technology" 
                                domain={[0, 1]} 
                                label={<YAxisLabel padding={5} color={'#41527D'} orientation="left" text="Technology"/>}
                                orientation="left" 
                                stroke='#41527D' 
                                strokeWidth={2} 
                                tickFormatter={CommaFormat} 
                                yAxisId="left" 
                            />

                            <Line connectNulls={true} dot={false} yAxisId="left" type="natural" type='linear' dataKey='technology' stroke='#41527D' strokeWidth={3} />
                            
                            </LineChart>
                        </ResponsiveContainer>
                </TechChart>) 
        return chart
    }
    render(){

        
        return(<ChartsContainer>
        
            {this.renderPopulationChart(this.props.population_data)}
            {this.renderAffluenceChart(this.props.affluence_data)}
            {this.renderTechChart(this.props.technology_data)}

            
        </ChartsContainer>)
    }
}

const CommaFormat = (value) => {
    return value.toLocaleString()
}

const AngledTick = (props) => {
    const {x, y, payload} = props
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
}

const XAxisLabel = (props) => {
  const {x, y, width, height} = props.viewBox
  const cx =  x + (width / 2)
  const cy =  y + height + 40
  return (
    <AxisLabel x={cx} y={cy} textAnchor="middle">
      {props.text} 
    </AxisLabel>
  )
}

const YAxisLabel = (props) => {
  const {x, y, width, height} = props.viewBox
  const { orientation, color, padding=100 } = props
  const cx = orientation === "right" ?  x + padding + width : x - padding
  const cy = (height / 2) + y
  const rot = `270 ${cx} ${cy}`

  console.log(props)
  return (
    <AxisLabel x={cx} y={cy} color={color} transform={`rotate(${rot})`} textAnchor="middle">
      {props.text}
    </AxisLabel>
  )
}

const chartsHeight = 250


const AxisLabel = styled.text`
    font-weight:bold;
    fill:${(props)=> props.color ? props.color : "black" };

`

const Detail = styled.div`
    color: ${(props)=> props.color ? props.color : "black" };
    font-weight:bold;
`
const ChartsContainer = styled.div`
    width:100%;
    height:300px;
    ${clearFix()}
`

const PopulationChart = styled.div`

    width:30%;
    height:${chartsHeight}px;
    float:left;

`

const AffluenceChart = styled.div`

    width:30%;
    height:${chartsHeight}px;
    float:left;


`
const TechChart = styled.div`
    width:30%;
    height:${chartsHeight}px; 
    float:left;

`