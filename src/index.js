import 'bootstrap/dist/css/bootstrap.css'

import React from "react"
import ReactDOM from "react-dom"

import Container from "./components/Container"

const app = document.getElementById('app');
let state = {
}
ReactDOM.render(<Container appState={state}/>, app);


