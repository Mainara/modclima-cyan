import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form, Select, Message } from 'semantic-ui-react'
import { harvestService } from '../services/harvestService'
import { farmService } from '../services/farmService'

export default class Farms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            farms: [], farmCode: '', farmName: '', harvestId: '', harvests: [], error: false,
            errorMsg: ''
        }

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.addFarm = this.addFarm.bind(this);
        this.handleHarvestIdChange = this.handleHarvestIdChange.bind(this);
    }

    componentDidMount() {
        this.getHarvests()
        this.getFarms()
    }

    removeFarm(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            farmService.deleteFarm(id).then(res => {
                if (res.status === 204) {
                    this.getFarms();
                } else {
                    this.setState({ error: true, errorMsg: 'Error when trying to delete the farm' })
                }
            });
        }
    }

    getFarms() {
        farmService.getFarms().then(response => this.setState({ farms: response }))
    }

    getHarvests() {
        harvestService.getHarvests().then(harvests => {
            let currentHarvests = []
            harvests.forEach(harvest => {
                currentHarvests.push({ key: harvest.id, value: harvest.id, text: harvest.code })
            });
            this.setState({ harvests: currentHarvests });
        })
    }

    addFarm() {
        let farm = { code: this.state.farmCode, name: this.state.farmName, harvestId: this.state.harvestId }
        farmService.addFarm(farm).then(() => this.getFarms())
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
                {this.state.error && <Message negative >
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Farm code</Table.HeaderCell>
                            <Table.HeaderCell>Farm name</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.farms.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.code}</Table.Cell>
                            <Table.Cell>{item.name} </Table.Cell>
                            <Table.Cell collapsing>
                                <Button icon size='tiny' color='red'
                                    onClick={() => this.removeFarm(item.id)}
                                ><Icon name='delete' /> </Button>
                            </Table.Cell>
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
    paddingRight: '3%',
    paddingTop: '1%'
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

