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
import styles from "./_Styles"
import styled from "styled-components"



const ImpactChartContainer = styled.div`
    width:100%;
    height:400px;
`

export default class ImpactChartComponent extends React.Component{


    render(){

        return(<ImpactChartContainer>

            <ResponsiveContainer>
                    <LineChart width={600} height={300} data={this.props.population_data}
                        margin={{ top: 10, right: 50, left: 100, bottom: 50 }}>

                    <XAxis 
                        dataKey="year" 
                        strokeWidth={2} 
                        domain={['auto', 'auto']}  

                        label={<XAxisLabel text="Year"/>} 
                        tickCount={5}

                        tick={<AngledTick />}
                    />
                  
                    <YAxis  
                        yAxisId="left" 
                        orientation="left" 
                        dataKey="pop" 
                        domain={['auto', 'auto']}  
                        label={<YAxisLabel orientation="left" text="Population"/>}
                        tickFormatter={CommaFormat}
                        stroke='#41527D'
                        strokeWidth={2}
                    />


                    <YAxis strokeWidth={2} tickFormatter={CommaFormat} yAxisId="right" orientation="right" dataKey="impact" domain={['auto', 'auto']} stroke='#F70D1C' label={<YAxisLabel orientation="right" text="Impact"/>} />

                    <Tooltip 
                        content={<IPATTooltipCustom />}
                        isAnimationActive={false}
                    />

                    <Line dot={false} yAxisId="left" type="natural" type='linear' dataKey='pop' stroke='#41527D' strokeWidth={3} />
                    <Line dot={false} yAxisId="right" type="natural" type='linear' dataKey='impact' stroke='#F70D1C' strokeWidth={3} />

                    </LineChart>
                </ResponsiveContainer>

        </ImpactChartContainer>)
    }
}

/**
 *  Dumb functional components
 */
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
    <text x={cx} y={cy} textAnchor="middle">
      {props.text} 
    </text>
  )
}

const YAxisLabel = (props) => {
  const {x, y, width, height} = props.viewBox
  const { orientation } = props
  const cx = orientation === "right" ?  x + 30 + width : x - 65
  const cy = (height / 2) + y
  const rot = `270 ${cx} ${cy}`
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle">
      {props.text}
    </text>
  )
}

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