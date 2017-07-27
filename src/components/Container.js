import React from "react"
import axios from "axios"
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
import PopulationComponent from "./PopulationContainer"
import PopulationData from "../../public/data/population.json"
import styled from "styled-components"
import { clearFix } from "polished"

const ContainerDiv = styled.div`
    width: 100%;
    text-align: center;
`
const Header = styled.h1`
    margin:0;
    margin-bottom: 10px;
    padding:10px;
    background-color:black;
    color:white;
`
const Input = styled.input`
    width:400px;
`
const LtiMessageContainer = styled.h3`
    color: ${ (props) => props.valid ? "green":"red" }
`

const PopulationChartContainer = styled.div`
    width:100%;
    height:400px;
`
const ImpactCharContainer = styled.div`
    width:100%;
    height:400px;
`

const Button = styled.input`
    ${ styles.uqxBorder }
`


export default class Container extends React.Component {
    constructor(props){
        super(props);

        let defaultState = {
            population_data:PopulationData
        }
        props.appState ? this.state = { ...defaultState, ...props.appState} : this.state = defaultState

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.dangerClicked = this.dangerClicked.bind(this)
    }
    componentWillMount(){
        console.log("Layout component will mount")
        
    }
    componentDidMount(){
        console.log("Layout component did mount");
        


        axios.get('../public/api/api.php', {
            params: {
                action: "hello",
                data:{
                    name:"World"
                }
            }
        })
        .then(response => {
            this.setState({
                api_message:response.data
            })
           
        }).catch(error => {
            console.log(error.response)
        });


       // console.log(PopulationData)


        const title = this.some`
        blue:red
        red:green
        green:yellow
        `
        
    }
    componentWillUnmount(){
        console.log("Layout component will unmount")
    }

    handleInputOnChange(event){
        this.setState({
            input_val:event.target.value
        })
    }

    some(breaks){
        console.log(breaks,arguments);
        return "blue"
    }

    dangerClicked(e){
        console.log(e.target.value);
    }

    render(){

        let LTI_Message = <LtiMessageContainer invalid>"Oh No LTI is not valid"</LtiMessageContainer>

        if($LTI_custom_variable_by_user_bool && $LTI_is_valid){
            LTI_Message = <LtiMessageContainer valid>LTI is valid and a custom LTI variable is now available in the global scope - {$LTI_custom_variable_by_user_string}</LtiMessageContainer>
        }
        //console.log(PopulationData)
        

        return (
        <ContainerDiv>
            <Header>MiningX I=PAT Visualisation</Header>

            <ImpactCharContainer>
            
                <ResponsiveContainer>
                    <LineChart width={600} height={300} data={this.state.population_data}
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
            
            </ImpactCharContainer>

           

                <Button value="Danger Button" type="Button" onClick={this.dangerClicked} className="btn btn-md btn-danger" readOnly/>



            <PopulationComponent />

            

        </ContainerDiv>);
    }
}

const CommaFormat = (value) => {
    return value.toLocaleString()
}
const AngledTick = (props) => {
    const {x, y, payload} = props;
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
}
const XAxisLabel = (props) => {
  const {x, y, width, height} = props.viewBox;
  const cx =  x + (width / 2);
  const cy =  y + height + 40;
  return (
    <text x={cx} y={cy} textAnchor="middle">
      {props.text} 
    </text>
  );
};

const YAxisLabel = (props) => {
  const {x, y, width, height} = props.viewBox;
  const { orientation } = props
  const cx = orientation === "right" ?  x + 30 + width : x - 65
  const cy = (height / 2) + y
  const rot = `270 ${cx} ${cy}`
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle">
      {props.text}
    </text>
  );
};

const IPATToolTip = styled.div`
    width:170px;
    height:100px;
    background-color:white;
    color:black;
    border:1px solid black;
`
const TooltipHeader = styled.div`
    background-color:black;

`

const IPATTooltipCustom = (props) => {
    console.log(props)
    return(<IPATToolTip>
        
    </IPATToolTip>)
}


