import React from 'react'
import ReactDOM from 'react-dom'

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <p>It's THOK o'clock now</p>
            </div>
    }
}

const wrapper = document.getElementById('root')
wrapper ? ReactDOM.render(<Main />, wrapper) : console.log('Unable to locate root')
