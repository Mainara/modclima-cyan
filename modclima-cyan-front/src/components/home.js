import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import MapContainer from './map'
import { homeService } from '../services/homeService'

export default class Farms extends Component {

    constructor(props) {
        super(props)
        this.state = {
            millName: '', startDate: '', endDate: '', harvestCode: '', farmName: '',
            farmCode: '', fieldCode: '', points: [[0, 0]], disabledFilter: true
        }

        this.handleMillNameChange = this.handleMillNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleHarvestCodeChange = this.handleHarvestCodeChange.bind(this);
        this.handleFarmNameChange = this.handleFarmNameChange.bind(this);
        this.handleFarmCodeChange = this.handleFarmCodeChange.bind(this);
        this.handleFieldCodeChange = this.handleFieldCodeChange.bind(this);
        this.getFields = this.getFields.bind(this);
    }

    checkFilterButton() {
        if (this.state.millName !== '' || this.state.startDate !== '' || this.state.endDate !== '' ||
            this.state.harvestCode !== '' || this.state.farmName !== '' || this.state.farmCode !== '' ||
            this.state.fieldCode !== '') {
            this.setState({ disabledFilter: false })
        } else {
            this.setState({ disabledFilter: true })
        }
    }

    handleMillNameChange(event) {
        this.setState({ millName: event.target.value }, () => { this.checkFilterButton() })
    }

    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value }, () => { this.checkFilterButton() })
    }

    handleEndDateChange(event) {
        this.setState({ endDate: event.target.value }, () => { this.checkFilterButton() })
    }

    handleHarvestCodeChange(event) {
        this.setState({ harvestCode: event.target.value }, () => { this.checkFilterButton() })
    }

    handleFarmNameChange(event) {
        this.setState({ farmName: event.target.value }, () => { this.checkFilterButton() })
    }

    handleFarmCodeChange(event) {
        this.setState({ farmCode: event.target.value }, () => { this.checkFilterButton() })
    }

    handleFieldCodeChange(event) {
        this.setState({ fieldCode: event.target.value }, () => { this.checkFilterButton() })
    }

    getFields() {
        homeService.filterFields(this.state.millName, this.state.startDate, this.state.endDate, this.state.harvestCode,
            this.state.farmName, this.state.farmCode, this.state.fieldCode).then(fields => {
                let currentPoints = []
                fields.forEach(field => {
                    currentPoints.push(field.point.coordinates)
                });
                this.setState({ points: currentPoints })
            })
    }

    render() {
        return (
            <div style={homeStyle}>
                <Form>
                    <Form.Group widths='equal' style={formGroupStyle}>
                        <Form.Field>
                            <label>Mill Name</label>
                            <input value={this.state.millName} onChange={this.handleMillNameChange} type='text' />
                        </Form.Field>
                        <Form.Field >
                            <label>Harvest start date</label>
                            <input value={this.state.startDate} onChange={this.handleStartDateChange} type='date' />
                        </Form.Field>
                        <Form.Field >
                            <label>Harvest end date</label>
                            <input value={this.state.endDate} onChange={this.handleEndDateChange} type='date' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field >
                            <label>Harvest Code</label>
                            <input value={this.state.harvestCode} onChange={this.handleHarvestCodeChange} type='text' />
                        </Form.Field>
                        <Form.Field >
                            <label>Farm Name</label>
                            <input value={this.state.farmName} onChange={this.handleFarmNameChange} type='text' />
                        </Form.Field>
                        <Form.Field >
                            <label>Farm Code</label>
                            <input value={this.state.farmCode} onChange={this.handleFarmCodeChange} type='text' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='3'>
                        <Form.Field >
                            <label>Field Code</label>
                            <input value={this.state.fieldCode} onChange={this.handleFieldCodeChange} type='text' />
                        </Form.Field>
                        <Button disabled={this.state.disabledFilter} content='Filter' primary style={filterStyle} onClick={this.getFields} />
                    </Form.Group>
                </Form>
                <MapContainer points={this.state.points} width={94} height={90} />
            </div>
        )
    }
}

const homeStyle = {
    paddingLeft: '3%',
    paddingRight: '3%'
};

const formGroupStyle = {
    paddingTop: '2%'
};

const filterStyle = {
    marginTop: '2%',
    marginLeft: '0.5%'
}
