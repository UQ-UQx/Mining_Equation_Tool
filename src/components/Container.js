import React from "react"

import axios from "axios"
import ChartsContainerComponent from "./ChartsContainerComponent"
import ImpactCharContainer from "./ImpactChartComponent"
import { clearFix } from "polished"
import OptionsPanelComponent from "./OptionsPanelComponent"
import PopulationData from "../../public/data/population.json"
import styles from "./_Styles"
import styled from "styled-components"
import population from "../../public/data/pop.json"

export default class Container extends React.Component {
    constructor(props){
        super(props);

        let defaultState = {
            population_data_original:PopulationData,
            population_type:"median",
            gdp:75000000000000,
            start_year:2015,
            end_year:2070,
            gdp_increase:0.01,
            technology_start:1,
            technology_decrease:0.01
        }
        props.appState ? this.state = { ...defaultState, ...props.appState} : this.state = defaultState
        this.updateStateValue = this.updateStateValue.bind(this)

    }
 

    updateStateValue(update){
        this.setState(update)
    }

    getAffluence(gdp_per_capita){
        return (1*(gdp_per_capita*gdp_per_capita)*0.000001)+(gdp_per_capita*0.0568)
    }

    getPopulationForYear(year, type="median"){
        const multiplier = 1
        switch (type) {
            case "median":
                console.log("DEFAULT")
                return (-462.8099673478*(year*year))+(1948623.62597925*year)-2039965212.08985
                break;
            case "upper_a":
                return multiplier*(-240.27082606811*(year*year) + (1056081.92498441*year) - 1145040509.46842)
                break;
            case "upper_b":
                return multiplier*(-329.113947618651*(year*year) + (1413131.02430131*year) - 1503777769.62494)
                break;
            case "lower_a":
                return multiplier*(-596.968721932397*(year*year) + (2481685.02691941*year) - 2569362067.99851)
                break;
            case "lower_b":
                return multiplier*(-565.481589736824*(year*year) + (2358142.21904195*year) - 2448275574.59439)
                break;
            default:
                break;
        }
    }

    render(){

       
        

        let affluence_data = []
        let technology_data = []
        let population_data = []
        let impact_data = []
        let impact_chart_data = []

        let gdp = this.state.gdp
        let tech = this.state.technology_start

        for (var year = this.state.start_year; year <= this.state.end_year; year++) {
           
            let population = this.getPopulationForYear(year, this.state.population_type)
            let gdp_per_capita = gdp/population
            let affluence = this.getAffluence(gdp_per_capita)
            console.log(affluence, tech, population)
            let impact = population*affluence*tech

            population_data.push({
                year:year,
                pop:population
            })
            affluence_data.push({
                year:year,
                affluence: affluence
            })
            technology_data.push({
                year:year,
                technology: tech
            })
            impact_data.push({
                year:year,
                impact:impact
            })
            impact_chart_data.push({
                year:year,
                pop:population,
                impact:impact
            })



            gdp = this.state.gdp_increase > 0 ? gdp + ( gdp * this.state.gdp_increase) : gdp
            tech = this.state.technology_decrease > 0 ? tech - ( tech * this.state.technology_decrease) : tech
        }

    


        
        return (<ContainerDiv>

            <Header>MiningX I=PAT Visualisation</Header>

            <ChartsContainerComponent
                population_data={population_data}
                affluence_data={affluence_data}
                technology_data={technology_data}
            />
            

             <ImpactCharContainer
                population_data={population_data}
                impact_data={impact_data}
                impact_chart_data={impact_chart_data}
            /> 

            <OptionsPanelContainer>
                <OptionsPanelComponent
                    {...this.state}
                    calculateNewValues={this.calculateNewValues}
                    updateStateValue={this.updateStateValue}
                />
            </OptionsPanelContainer>

        </ContainerDiv>);
    }
}


const ContainerDiv = styled.div`
    width: 100%;
   /*  max-width:1100px; */
`
const Header = styled.h1`
    margin:0;
    margin-bottom: 10px;
    padding:10px;
    background-color:black;
    color:white;
    text-align:center;
`
const OptionsPanelContainer = styled.div`

    width:100%;
    height:200px;
    

`