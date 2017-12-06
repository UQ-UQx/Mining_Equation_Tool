import React from "react"

import CheckBoxGroup from "../lib/CheckBoxGroup"
import { clearFix } from "polished"
import styled from "styled-components"


export default class OptionsPanelComponent extends React.Component {


    render(){
        return (<OptionsPanel className="OptionsPanel">
            
        <h4>GDP Increase over time</h4>

            <CheckBoxGroup
            
                name="gdp_increase"
                options={[
                    {
                        value:"1% GDP Increase",
                        data:0.01,
                        checked: true,
                    },
                    {
                        value:"2% GDP Increase",
                        data:0.02,
                        checked: false,
                    },
                    {
                        value:"3% GDP Increase",
                        data:0.03,
                        checked: false,
                    }
                ]}
                type="radio"
                returnVal="all"
                onOptionChange={(name, selected_options)=>{
                    console.log(name, selected_options)

                    this.props.updateStateValue({
                        "gdp_increase":selected_options[0].data
                    }) 

                }}
            
            />
            <h4>Population Predictions</h4>

            <CheckBoxGroup
            
                name="gdp_increase"
                options={[
                    {
                        value:"Median",
                        data:"median",
                        checked: true,
                    },
                    {
                        value:"Upper 95%",
                        data:"upper_a",
                        checked: false,
                    },
                    {
                        value:"Upper 80%",
                        data:"upper_b",
                        checked: false,
                    },
                    {
                        value:"Lower 95%",
                        data:"lower_a",
                        checked: false,
                    },
                    {
                        value:"Lower 80%",
                        data:"lower_b",
                        checked: false,
                    }
                ]}
                type="radio"
                returnVal="all"
                onOptionChange={(name, selected_options)=>{
                    console.log(name, selected_options)

                    this.props.updateStateValue({
                        "population_type":selected_options[0].data
                    }) 

                }}
            
            />

            <h4>Technology Efficiency Improvement</h4>
             <CheckBoxGroup
            
                name="tech_decrease"
                options={[
                    {
                        value:"Tech 1%",
                        data:0.01,
                        checked: true,
                    },
                    {
                        value:"Tech 2%",
                        data:0.02,
                        checked: false,
                    },
                    {
                        value:"Tech 3%",
                        data:0.03,
                        checked: false,
                    },
                    {
                        value:"Tech 4%",
                        data:0.04,
                        checked: false,
                    },
                    {
                        value:"Tech 5%",
                        data:0.05,
                        checked: false,
                    }
                ]}
                type="radio"
                returnVal="all"
                onOptionChange={(name, selected_options)=>{
                    console.log(name, selected_options)

                    this.props.updateStateValue({
                        "technology_decrease":selected_options[0].data
                    }) 

                }}
            
            />
        </OptionsPanel>)
    }
}

const OptionsPanel = styled.div`
    width: 550px;
    margin:0 auto;
    text-align:center;
    padding-left:40px;
`