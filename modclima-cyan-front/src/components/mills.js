import React, { Component } from 'react'
import { Table, Modal, Button, Icon, Form, Message } from 'semantic-ui-react'
import { millService } from '../services/millService'

export default class Mills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mills: [], millName: '', error: false,
            errorMsg: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.addMill = this.addMill.bind(this);
    }

    componentDidMount() {
        this.getMills()
    }

    removeMill(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            millService.deleteMill(id).then(res => {
                if (res.status === 204) {
                    this.getMills();
                } else {
                    this.setState({ error: true, errorMsg: 'Error when trying to delete the mill' })
                }
            });
        }
    }

    getMills() {
        millService.getMills().then(response => this.setState({ mills: response }))
    }

    addMill() {
        millService.addMill(this.state.millName).then(() => this.getMills())
    }

    cancellAdition() {

    }

    handleChange(event) {
        this.setState({ millName: event.target.value });
    }

    render() {
        return (
            <div style={millsStyle}>
                {this.state.error && <Message negative >
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Mill name</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.mills.map((item, i) => <Table.Row key={i}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell collapsing>
                                <Button icon size='tiny' color='red'
                                    onClick={() => this.removeMill(item.id)}><Icon name='delete' /> </Button>
                            </Table.Cell>
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
    paddingRight: '3%',
    paddingTop: '1%'
};

const labelName = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '2%'
};
