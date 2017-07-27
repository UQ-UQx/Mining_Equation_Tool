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
            population_data:PopulationData
        }
        props.appState ? this.state = { ...defaultState, ...props.appState} : this.state = defaultState

    }

    render(){
        return (<ContainerDiv>

            <Header>MiningX I=PAT Visualisation</Header>

            <ImpactCharContainer
                population_data={this.state.population_data}
            />

        </ContainerDiv>);
    }
}




