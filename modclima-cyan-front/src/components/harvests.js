import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form, Select } from 'semantic-ui-react'

export default class Harvests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            harvests: [], harvestCode: '', harvestStartDate: new Date(),
            harvestEndDate: new Date(), millId: '', mills: []
        }

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.addHarvest = this.addHarvest.bind(this);
        this.handleMillIdChange = this.handleMillIdChange.bind(this);
    }

    addHarvest() {
        let harvest = {
            code: this.state.harvestCode, startDate: this.state.harvestStartDate,
            endDate: this.state.harvestEndDate, millId: this.state.millId
        }
        this.setState({
            harvests: [...this.state.harvests, harvest], harvestCode: '',
            harvestStartDate: null, harvestEndDate: null, millId: ''
        })
    }

    cancellAdition() {

    }

    handleCodeChange(event) {
        this.setState({ harvestCode: event.target.value });
    }

    handleMillIdChange(e, { value }) {
        this.setState({ millId: value })
    }

    handleStartDateChange(event) {
        this.setState({ harvestStartDate: event.target.value });
    }

    handleEndDateChange(event) {
        this.setState({ harvestEndDate: event.target.value });
    }

    render() {
        return (
            <div style={harvestsStyle}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Harvest code</Table.HeaderCell>
                            <Table.HeaderCell>Start date</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.harvests.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.code}</Table.Cell>
                            <Table.Cell>{item.startDate}</Table.Cell>
                            <Table.Cell>{item.endDate}</Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>

                <Modal
                    dimmer='blurring'
                    trigger={<Button icon> <Icon name='add circle' /> Add Harvest</Button>}
                    header='Add Harvest'
                    content={<Form>
                        <Form.Field style={labelField}>
                            <label>Code</label>
                            <input type='text' value={this.state.harvestCode} onChange={this.handleCodeChange} />
                        </Form.Field>
                        <Form.Field style={labelField}>
                            <label>Start Date</label>
                            <input type='date' value={this.state.harvestStartDate} onChange={this.handleStartDateChange} />
                        </Form.Field>
                        <Form.Field style={labelField}>
                            <label>End Date</label>
                            <input type='date' value={this.state.harvestEndDate} onChange={this.handleEndDateChange} />
                        </Form.Field>
                        <Select
                            style={selectStyle}
                            placeholder='Select a mill'
                            options={this.state.mills}
                            onChange={this.handleMillIdChange} />
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
                            onClick: this.addHarvest
                        }
                    ]}
                />
            </div>)
    }
}

const harvestsStyle = {
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
