import React from "react"

import CheckBoxGroup from "../lib/CheckBoxGroup"
import styled from "styled-components"

export default class OptionsPanelComponent extends React.Component {


    render(){
        return (<OptionsPanel className="OptionsPanel">
            
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
        </OptionsPanel>)
    }
}

const OptionsPanel = styled.div`
    width: 445px;
    margin: 0 auto;
`