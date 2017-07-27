import React from "react"
import styles from "./_Styles"
import styled from "styled-components"


const DangerButton = styled.input`

    ${ styles.uqxBorder }

`

export default class PopulationComponent extends React.Component {



    render(){
        return (<div>Population container
            
            
            <DangerButton value="Danger Button" type="Button" onClick={this.dangerClicked} className="btn btn-md btn-danger" readOnly/>


            
        </div>)
    }
}