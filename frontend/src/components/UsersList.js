import React from 'react';
import axios from 'axios';
import {Button, Divider, List} from 'antd';
import { Row, Col } from 'antd';
import DeleteUserButton from "./DeleteUserButton";
import DetailsUserButton from "./DetailsUserButton";
import UpdateUserButton from "./UpdateUserButton";
import AddUsersForm from "./AddUsersForm";
import {Modal} from "antd/lib/index";
const ButtonGroup = Button.Group;

export default class UsersList extends React.Component{
    state = {
        persons: []
    }

    getList = () => {
        axios.get('http://127.0.0.1:3000/users')
            .then(res => {
                console.log(res);
                this.setState({ persons: res.data });
            })
    }

    handleDelete = (itemId) =>{
        let self = this;
        let confirm = Modal.confirm({
            title: 'Vuoi veramente eliminare questo elemento',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete('http://localhost:3000/users/' + itemId)
                .then(res => {
                    return self.getList();
                })
            },
            onCancel() {},
        });
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.getList();
    }



    render(){
        return (
            <div>
            <AddUsersForm
            getList={this.getList}/>
            <Divider orientation="left">Users list</Divider>
            <Row type="flex" justify="center">
                <Col span={22}>
                    <List
                        bordered
                        itemLayout="horizontal"
                        dataSource={this.state.persons}
                        renderItem={item => (
                            <div>
                                <Row type="flex" justify="start" align="middle">
                                    <Col span={9}>
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.nome + " " + item.cognome}
                                            />
                                        </List.Item>
                                    </Col>
                                    <Col span={15} >
                                        <Row type="flex" justify="end" align="middle">
                                            <Col span={5}>
                                                <DetailsUserButton
                                                    itemId = {item.id}
                                                />
                                            </Col>
                                            <Col span={5}>
                                                <UpdateUserButton
                                                    itemId = {item.id}
                                                    getList= {this.getList}
                                                />
                                            </Col>
                                            <Col span={5}>
                                                <DeleteUserButton
                                                    handleDelete = {this.handleDelete}
                                                    itemId = {item.id}
                                                />
                                            </Col>
                                        </Row>


                                    </Col>
                                </Row>
                            </div>
                        )}
                    />
                </Col>
            </Row>

            </div>
        )
    }

    dummy(){
        <ul>
            {
                this.state.persons.map(person =>
                    <li key={person.id}>
                        <Row type="flex" justify="space-between">
                            <Col span={4}>
                                { person.nome + " " + person.cognome}
                            </Col>
                            <Col span={4}>
                                <ButtonGroup>
                                    <Button type="primary">dettagli</Button>
                                    <Button type="secondary">aggiorna</Button>
                                    <Button type="danger">elimina</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </li>)
            }
        </ul>
    }
}

