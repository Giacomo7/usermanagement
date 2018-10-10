import React from 'react';
import {Button, Modal} from "antd";
import axios from 'axios';

export default class DeleteUserButton extends React.Component{
    state = {
        modalVisible: false,
        modalMessage: []
    };

    showModal = (e) => {
        axios.get("http://localhost:3000/users/" + this.props.itemId)
            .then(res => {
                console.log(res);
                this.setState({ modalMessage: res.data });
            })
        this.setState({
            modalVisible: true,
        });

    }
    handleOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    render(){
        return(
            <div>
                <Button type="primary" key={this.props.itemId} onClick={this.showModal}>dettagli</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>id: {this.state.modalMessage.id}</p>
                    <p>nome: {this.state.modalMessage.nome}</p>
                    <p>cognome: {this.state.modalMessage.cognome}</p>
                    <p>email: {this.state.modalMessage.email}</p>
                </Modal>
            </div>
        )
    }
}