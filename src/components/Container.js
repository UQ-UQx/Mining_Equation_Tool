import React from "react"

import axios from "axios"
import ImpactCharContainer from "./ImpactChartComponent"
import { clearFix } from "polished"
import PopulationData from "../../public/data/population.json"
import styles from "./_Styles"
import styled from "styled-components"

const ContainerDiv = styled.div`
    width: 100%;
    max-width:1100px;
`
const Header = styled.h1`
    margin:0;
    margin-bottom: 10px;
    padding:10px;
    background-color:black;
    color:white;
    text-align:center;
`
export default class Container extends React.Component {
    constructor(props){
        super(props);

        let defaultState = {
            population_data_original:PopulationData,
            population_data:[],
            gdp:75000000000000,
            start_year:2015,
            end_year:2100,
            gdp_increase:0.02,
            technology_start:0.1,
            affluence_data:[],
            technology_data:[],
            impact_data:[],
            impact_chart_data:[]
        }
        props.appState ? this.state = { ...defaultState, ...props.appState} : this.state = defaultState
        this.calculateNewValues = this.calculateNewValues.bind(this)

    }

    componentWillMount(){


        this.calculateNewValues();

    }

    calculateNewValues(){
        console.log("BLEh");

        let population_data = this.state.population_data_original.filter((pop_dat)=>{
            if(pop_dat.year <= this.state.end_year && pop_dat.year >= this.state.start_year){
                return pop_dat;
            }
        })



        let affluence_data = []
        let technology_data = []
        let impact_data = []
        let impact_chart_data = []

        let gdp = this.state.gdp
        population_data.forEach((pop_dat, pop_ind)=>{

            let gdp_per_capita = gdp/pop_dat.pop

            let tech = this.state.technology_start > 0 ? this.state.technology_start*((population_data.length-pop_ind)/population_data.length): 1
            let aff = (-1*(gdp_per_capita^2)*0.000001)+(gdp_per_capita*0.0568)
            let impact =  aff*tech*pop_dat.pop
            /*  Affluence Formula y = -1E-06x^2 + 0.0568x

             =(-1*(A27^2)*0.000001)+(A27*0.0568) */

            console.log(pop_dat.year,pop_dat.pop, aff, tech, aff*tech*pop_dat.pop)
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
                pop:pop_dat.pop,
                impact:impact
            })


            gdp = this.state.gdp_increase > 0 ? gdp + ( gdp * this.state.gdp_increase) : gdp

        })



        console.log(affluence_data);


        this.setState({
            population_data,
            affluence_data,
            technology_data,
            impact_data,
            impact_chart_data
        })


    }


    render(){

        console.log("RENDER!!")
        
        return (<ContainerDiv>

            <Header>MiningX I=PAT Visualisation</Header>

             <ImpactCharContainer
                population_data={this.state.population_data}
                impact_data={this.state.impact_data}
                impact_chart_data={this.state.impact_chart_data}
            /> 

        </ContainerDiv>);
    }
}




