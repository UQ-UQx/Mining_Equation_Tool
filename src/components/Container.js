import React from "react"

import axios from "axios"
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
            end_year:2100,
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
        return (-1*(gdp_per_capita^2)*0.000001)+(gdp_per_capita*0.0568)
    }

    render(){

        console.log(population[0][this.state.population_type])
        let population_data = population.filter((pop_dat)=>{
            if(pop_dat.year <= this.state.end_year && pop_dat.year >= this.state.start_year){
                return pop_dat;
            }
        })

        

        let affluence_data = []
        let technology_data = []
        let impact_data = []
        let impact_chart_data = []

        let gdp = this.state.gdp
        let tech = this.state.technology_start

        population_data.forEach((pop_dat, pop_ind)=>{

            let gdp_per_capita = gdp/pop_dat[this.state.population_type]
            console.log(pop_dat[this.state.population_type])
            let aff = (-1*(gdp_per_capita^2)*0.000001)+(gdp_per_capita*0.0568)
            let impact =  aff*tech*pop_dat[this.state.population_type]
            /*  Affluence Formula y = -1E-06x^2 + 0.0568x

             =(-1*(A27^2)*0.000001)+(A27*0.0568) */

            // console.log(pop_dat.year,pop_dat[this.state.population_type], gdp, aff, tech, aff*tech*pop_dat[this.state.population_type])
            affluence_data.push({
                year:pop_dat.year,
                affluence: aff
            })
            technology_data.push({
                year:pop_dat.year,
                technology: tech
            })
            impact_data.push({
                year:pop_dat.year,
                impact:impact
            })
            impact_chart_data.push({
                year:pop_dat.year,
                pop:pop_dat[this.state.population_type],
                impact:impact
            })


            gdp = this.state.gdp_increase > 0 ? gdp + ( gdp * this.state.gdp_increase) : gdp
            
        })



        
        return (<ContainerDiv>

            <Header>MiningX I=PAT Visualisation</Header>

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