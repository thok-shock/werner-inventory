import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function WISNavbar() {
    return <Navbar expand='md'>
    <Navbar.Brand><img src='/img/WIS (1).png' height='35px' className='pb-2 mr-2'></img>Werner Inventory System (WIS)</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className='justify-content-end'> 
    <Nav className='mr-3'><Link to='/overview'>Overview</Link></Nav>
    <Nav><Link to='/new'>Add New</Link></Nav>
    </Navbar.Collapse>
    
</Navbar>
}