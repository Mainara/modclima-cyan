import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form, Select } from 'semantic-ui-react'

export default class Farms extends Component {

    constructor(props) {
        super(props);
        this.state = { farms: [], farmCode: '', farmName: '', harvestId: '', harvests: []}

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.addFarm = this.addFarm.bind(this);
        this.handleHarvestIdChange = this.handleHarvestIdChange.bind(this);
    }

    addFarm() {
        let farm = {code: this.state.farmCode, name: this.state.farmName, harvestId: this.state.harvestId}
        this.setState({ farms: [...this.state.farms, farm], farmCode: '', 
            farmName: '', harvestId: ''})
    }

    handleHarvestIdChange(e, { value }) {
        this.setState({ harvestId: value })
    }

    cancellAdition() {

    }

    handleCodeChange(event) {
        this.setState({ farmCode: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ farmName: event.target.value });
    }

    render() {
        return (
            <div style={farmsStyle}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Farm code</Table.HeaderCell>
                            <Table.HeaderCell>Farm name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.farms.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.code}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>

                <Modal
                    dimmer='blurring'
                    trigger={<Button icon> <Icon name='add circle' /> Add Farm</Button>}
                    header='Add Farm'
                    content={<Form>
                        <Form.Field style={labelField}>
                            <label>Code</label>
                            <input type='text' value={this.state.farmCode} onChange={this.handleCodeChange} />
                        </Form.Field>
                        <Form.Field style={labelField}>
                            <label>Name</label>
                            <input type='text' value={this.state.farmName} onChange={this.handleNameChange} />
                        </Form.Field>
                        <Select
                            style={selectStyle}
                            placeholder='Select a harvest'
                            options={this.state.harvests}
                            onChange={this.handleHarvestIdChange} />
                    </Form>}
                    actions={[
                        {
                            key: "cancel",
                            content: "Cancel",
                            onClick: this.cancellAdition,
                            positive: false
                        },
                        {
                            key: "save",
                            content: "Save",
                            positive: true,
                            onClick: this.addFarm
                        }
                    ]}
                />
            </div>)
    }
}

const farmsStyle = {
    paddingLeft: '3%',
    paddingRight: '3%'
};

const labelField = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '2%'
};

const selectStyle = {
    marginLeft: '3%',
    marginBottom: '2%'
}

