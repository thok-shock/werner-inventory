import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default function Footer() {
    return <Navbar fixed='bottom'>
        <a href='https://rswerner.com'><div className='text-muted'><small>© 2020 Ryan Werner - v0.2</small></div></a>
    </Navbar>
}