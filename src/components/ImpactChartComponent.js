import React from "react"

import { clearFix } from "polished"
import PopulationData from "../../public/data/population.json"
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
import {Motion, spring} from 'react-motion';
import styles from "./_Styles"
import styled from "styled-components"



const ImpactChartContainer = styled.div`
    width:100%;
    height:400px;
`

export default class ImpactChartComponent extends React.Component{



    render(){

        console.log("CHART COMPONENT", this.props)

         let chart = (<ResponsiveContainer>
                    <LineChart width={600} height={300} data={this.props.impact_chart_data}
                        margin={{ top: 10, right: 100, left: 100, bottom: 50 }}>

                    <XAxis 
                        dataKey="year" 
                        domain={['auto', 'auto']}  
                        label={<XAxisLabel text="Year"/>} 
                        strokeWidth={2} 
                        tickCount={5}
                        tick={<AngledTick />}
                    />
                  
                    <YAxis  
                        dataKey="pop" 
                        domain={["auto", "auto"]} 
                        label={<YAxisLabel color={'#41527D'} orientation="left" text="Population"/>}
                        orientation="left" 
                        stroke='#41527D' 
                        strokeWidth={2} 
                        tickFormatter={CommaFormat} 
                        yAxisId="left" 
                    />

                    <YAxis 
                        dataKey="impact" 
                        domain={["auto", "auto"]} 
                        label={<YAxisLabel color={'#F70D1C'} orientation="right" text="Impact"/>}
                        orientation="right" 
                        stroke='#F70D1C' 
                        strokeWidth={2} 
                        tickFormatter={CommaFormat} 
                        yAxisId="right" 
                    />

                    <Tooltip 
                        content={<IPATTooltipCustom />}
                        isAnimationActive={true}
                    />

                    <Line connectNulls={true} dot={false} yAxisId="left" type="natural" type='linear' dataKey='pop' stroke='#41527D' strokeWidth={3} />
                    <Line connectNulls={true} dot={false} yAxisId="right" type="natural" type='linear' dataKey='impact' stroke='#F70D1C' strokeWidth={3} />

                    </LineChart>
                </ResponsiveContainer>) 

        return(<ImpactChartContainer>

            {chart}


        </ImpactChartContainer>)
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
  const { orientation, color } = props
  const cx = orientation === "right" ?  x + 80 + width : x - 65
  const cy = (height / 2) + y
  const rot = `270 ${cx} ${cy}`

  console.log(props)
  return (
    <AxisLabel x={cx} y={cy} color={color} transform={`rotate(${rot})`} textAnchor="middle">
      {props.text}
    </AxisLabel>
  )
}

const AxisLabel = styled.text`
    font-weight:bold;
    fill:${(props)=> props.color ? props.color : "black" };

`

const IPATToolTip = styled.div`
    width:200px;
    height:120px;
    background-color:white;
    color:black;
    border:1px solid black;
    text-align:center;
`

const TooltipHeader = styled.div`
    background-color:black;
    color:white;
    width:100%;
    padding:10px;
    margin-bottom:10px;
`

const Detail = styled.div`
    color: ${(props)=> props.color ? props.color : "black" };
    font-weight:bold;
`

const IPATTooltipCustom = (props) => {
    const { payload } = props

    let impactDetail, populationDetail, yearDetail = null
    yearDetail = payload[0] ? <Detail>Year: {payload[0].payload.year}</Detail>:null;

    payload.forEach(item=>{
        if(item.dataKey === "impact"){
            impactDetail = <Detail color={item.color}>Impact: {CommaFormat(item.value)}</Detail>
        }
        if(item.dataKey === "pop"){
            populationDetail = <Detail color={item.color}>Population: {CommaFormat(item.value)}</Detail>
        }
    })

    return(<IPATToolTip>
        <TooltipHeader>
           Population &#38; Impact
        </TooltipHeader>
        {yearDetail}
        {populationDetail}
        {impactDetail}
    </IPATToolTip>)
}