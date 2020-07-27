import React, { useState } from 'react'
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap'
import { Link, Redirect, useHistory } from 'react-router-dom'
import DropdownItem from '../lowLevel/DropdownItem'


export default function WISNavbar(props) {
    const [open, updateOpen] = useState(false)
    let history = useHistory()
    return <Navbar expand='md' bg='white' sticky='top'>
    <Navbar.Brand onClick={() => {history.push('/overview')}}><img src='/img/WIS (1).png' height='35px' className='pb-2 mr-2' style={{cursor: 'pointer'}}></img></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className='justify-content-end'> 
    
    <Nav><Dropdown className='mr-2' show={open} drop='down' onMouseEnter={e => {updateOpen(true)}} onMouseLeave={e => {updateOpen(false)}}>
        <Dropdown.Toggle>Add New</Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={() => {history.push('/new?type=item')}}>Item</Dropdown.Item>
        <Dropdown.Item onClick={() => {history.push('/new?type=box')}}>Box</Dropdown.Item>
        <Dropdown.Item onClick={() => {history.push('/new?type=lot')}}>Lot</Dropdown.Item>
        </Dropdown.Menu>
        
        </Dropdown></Nav>
        <Nav className='mr-2'><Button variant='outline-primary' onClick={() => {history.push('/overview')}}>Overview</Button></Nav>
        <Nav className='mr-2'><Button variant='outline-primary' onClick={() => {history.push('/overview')}}>About</Button></Nav>
    </Navbar.Collapse>
</Navbar>
}