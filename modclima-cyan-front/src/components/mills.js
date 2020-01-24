import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form } from 'semantic-ui-react'

export default class Mills extends Component {

    constructor(props) {
        super(props);
        this.state = { mills: [], millName: '' }

        this.handleChange = this.handleChange.bind(this);
        this.addMill = this.addMill.bind(this);
    }

    addMill() {
        
    }

    cancellAdition() {

    }

    handleChange(event) {
        this.setState({ millName: event.target.value });
    }

    render() {
        return (
            <div style={millsStyle}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Mill name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.mills.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.name}</Table.Cell>
                        </Table.Row>)}

                    </Table.Body>
                </Table>

                <Modal
                    dimmer='blurring'
                    trigger={<Button icon> <Icon name='add circle' /> Add Mill</Button>}
                    header='Add Mill'
                    content={<Form>
                        <Form.Field style={labelName}>
                            <label>Name</label>
                            <input value={this.state.millName} onChange={this.handleChange} type='text' />
                        </Form.Field>
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
                            onClick: this.addMill
                        }
                    ]}
                />
            </div>)
    }
}

const millsStyle = {
    paddingLeft: '3%',
    paddingRight: '3%'
};

const labelName = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '2%'
};
