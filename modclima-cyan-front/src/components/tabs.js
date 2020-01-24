import React, { Component } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Tabs extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div style={homeStyle.content}>
                <Header style={homeStyle.nameHeader} as='h2' textAlign='center' content='ModClima Challenge' className='app-header' />

                <Menu inverted widths={5}>
                    <Menu.Item
                        as={Link} to='/'
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to='/mills'
                        name='Mills'
                        active={activeItem === 'Mills'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to='/harvests'
                        name='Harvests'
                        active={activeItem === 'Harvests'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to='/farms'
                        name='Farms'
                        active={activeItem === 'Farms'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to='/fields'
                        name='Fields'
                        active={activeItem === 'Fields'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </div>
        )
    }
}

const nameHeader = {
    paddingTop: '1%'
};

const content = {
    paddingLeft: '3%',
    paddingRight: '3%'
};

const homeStyle = { nameHeader, content }
