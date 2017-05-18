import React, { Component } from 'react'
import { Header, Title, Button } from 'native-base'


const NavBar = ({ title }) => {
    return (
        <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
            <Title>{title}</Title>
        </Header>
    )
}

export default NavBar
