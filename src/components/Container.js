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
    color: ${ (props) => props.status === "valid" ? "green":"red" }
`

const ChartContainerDiv = styled.div`
    width:100%;
    height:400px;
`


export default class Container extends React.Component {


    constructor(props){
        super(props);

        let defaultState = {
            input_val:"",
            api_message:"",
            data:[
                {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
            ]
        }
        props.appState ? this.state = { ...defaultState, ...props.appState} : this.state = defaultState

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
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


        console.log(PopulationData)


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

    render(){

        let LTI_Message = "Oh No LTI is not valid"
        let lti_status = "invalid";
        if($LTI_custom_variable_by_user_bool && $LTI_is_valid){
            LTI_Message = "LTI is valid and a custom LTI variable is now available in the global scope - "+$LTI_custom_variable_by_user_string
            lti_status = "valid";
        }
        console.log(PopulationData)
        

        return (
        <ContainerDiv>
            <Header>{this.state.input_val}</Header>
            
            <Input 
                type="text" 
                class="form-input" 
                id="usr"
                value={this.state.input_val}
                onChange={this.handleInputOnChange}
            />

            <h2>{this.state.api_message}</h2>
            <LtiMessageContainer status={lti_status}>{LTI_Message}</LtiMessageContainer>

            <ChartContainerDiv>
            
            
            <ResponsiveContainer>
                <LineChart width={600} height={300} data={PopulationData}
                    margin={{ top: 10, right: 30, left: 40, bottom: 20 }}>

                <XAxis dataKey="year"   label={<XAxisLabel text="Years"/>} />
                <YAxis dataKey="pop" domain={['auto', 'auto']}  label={<YAxisLabel text="Population"/>} />
                
                <Tooltip/>
                <Line type="natural" dot={false} dataKey="pop" stroke="#8884d8" />
                </LineChart>

            </ResponsiveContainer>
            
            
            </ChartContainerDiv>

            

        </ContainerDiv>);
    }
}

const XAxisLabel = (props) => {
 //console.log(props)
  const {x, y, width, height} = props.viewBox;
  const cx =  x + (width / 2);
  const cy =  y + height + 10;
  return (
    <text x={cx} y={cy} textAnchor="middle">
      {props.text} 
    </text>
  );
};

const YAxisLabel = (props, another, more, again) => {
  //console.log(props, another, more, again)
  const {x, y, width, height} = props.viewBox;
  const cx = x - 15
  const cy = (height / 2) + y
  const rot = `270 ${cx} ${cy}`
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle">
      {props.text}
    </text>
  );
};

