import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form, Grid, Select, Message } from 'semantic-ui-react'
import MapContainer from './map'
import { farmService } from '../services/farmService'
import { fieldService } from '../services/fieldService'

export default class Fields extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [], fieldCode: '', fieldLat: 0, fieldLng: 0, farms: [], farmId: '', error: false,
            errorMsg: ''
        }

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.addField = this.addField.bind(this);
        this.handleFarmIdChange = this.handleFarmIdChange.bind(this);
    }

    componentDidMount() {
        this.getFarms()
        this.getFields()
    }

    removeField(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            fieldService.deleteField(id).then(res => {
                if (res.status === 204) {
                    this.getFields();
                } else {
                    this.setState({ error: true, errorMsg: 'Error when trying to delete the field' })
                }
            });
        }
    }

    getFields() {
        fieldService.getFields().then(response => {
            this.setState({ fields: response })
        })

    }

    getFarms() {
        farmService.getFarms().then(farms => {
            let currentFarms = []
            farms.forEach(farm => {
                currentFarms.push({ key: farm.id, value: farm.id, text: farm.name })
            });
            this.setState({ farms: currentFarms });
        })
    }

    handleFarmIdChange(e, { value }) {
        this.setState({ farmId: value })
    }

    addField() {
        let field = {
            code: this.state.fieldCode, point: {
                type: 'Point', coordinates:
                    [this.state.fieldLat, this.state.fieldLng]
            },
            farmId: this.state.farmId
        }
        console.log(field)
        fieldService.addField(field)
        this.setState({
            fields: [...this.state.fields, field], fieldCode: '', fieldLat: 0, fieldLng: 0,
            farmId: ''
        })
    }

    cancellAdition() {

    }

    handleCodeChange(event) {
        this.setState({ fieldCode: event.target.value });
    }

    handleLatChange(event) {
        this.setState({ fieldLat: event.target.value });
    }

    handleLngChange(event) {
        this.setState({ fieldLng: event.target.value });
    }

    render() {
        return (
            <div style={fieldsStyle}>
                {this.state.error && <Message negative >
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Field code</Table.HeaderCell>
                            <Table.HeaderCell>Latitude</Table.HeaderCell>
                            <Table.HeaderCell>Longitude</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.fields.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.code}</Table.Cell>
                            <Table.Cell>{item.point.coordinates[0]}</Table.Cell>
                            <Table.Cell>{item.point.coordinates[1]}</Table.Cell>
                            <Table.Cell collapsing>
                                <Button icon size='tiny' color='red'
                                    onClick={() => this.removeField(item.id)}><Icon name='delete' /> </Button>
                            </Table.Cell>
                        </Table.Row>)}

                    </Table.Body>
                </Table>

                <Modal
                    dimmer='blurring'
                    trigger={<Button icon> <Icon name='add circle' /> Add Field</Button>}
                    header='Add Field'
                    content={<Grid>
                        <Grid.Column width={6}>
                            <Form>
                                <Form.Field style={labelName}>
                                    <label>Code</label>
                                    <input value={this.state.fieldCode} onChange={this.handleCodeChange} type='text' />
                                </Form.Field>
                                <Form.Field style={labelName}>
                                    <label>Latitude</label>
                                    <input value={this.state.fieldLat} onChange={this.handleLatChange} type='text' />
                                </Form.Field>
                                <Form.Field style={labelName}>
                                    <label>Longitude</label>
                                    <input value={this.state.fieldLng} onChange={this.handleLngChange} type='text' />
                                </Form.Field>
                                <Select
                                    style={selectStyle}
                                    placeholder='Select a farm'
                                    options={this.state.farms}
                                    onChange={this.handleFarmIdChange} />
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <MapContainer points={[[this.state.fieldLat, this.state.fieldLng]]}
                                width={150} height={85} />
                        </Grid.Column>
                    </Grid>}
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
                            onClick: this.addField
                        }
                    ]}
                />
            </div>)
    }
}

const fieldsStyle = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%'
};

const labelName = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '2%'
};

const selectStyle = {
    marginLeft: '3%',
    marginBottom: '2%'
}
