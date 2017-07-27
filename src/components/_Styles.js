import { css } from "styled-components"

export default {

    uqxBorder: css`
    
        border: 4px solid green;
        transition-property: border;
        transition-duration: 2s;

        &:hover{
            border: 4px solid blue;

        }
    `

}