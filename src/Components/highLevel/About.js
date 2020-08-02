import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class About extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>About</h2>
                        <p>The Werner Inventory System (WIS) was created in order to track boxes being moved to several different locations before all arriving at a single destination. In order to ensure that no items were lost, anything of value was documented and packed into a box.</p>
                        <p>Each Box inside of WIS has it's own ID, and can have a QR identification code printed and taped on to the box. Then, anyone with a device which can scan QR codes (including nearly all modern cell phone camera apps) can scan the code and see all information about the box. Feel free to use this system as needed, as I will be implementing new features over the coming weeks.</p>
                        <p>For issues or suggestions, please email <a href='emailto:webmaster@rswerner.com'>webmaster@rswerner.com</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}