import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Row, Col, Drawer} from 'antd';
import axios from 'axios';

class NormalLoginForm extends React.Component {
    state = {
        visible: false
    };
    showDrawer = () => {
        console.log(this.props);
        axios.get("http://localhost:3000/users/" + this.props.itemId)
            .then(res => {
                console.log(res);
                this.props.form.setFieldsValue({
                    nome: res.data.nome,
                    cognome: res.data.cognome,
                    email: res.data.email
                })
            })
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('http://127.0.0.1:3000/users', values).then(res => {
                    self.props.getList();
                    console.log(res);
                    self.setState({
                        visible:false
                    });

                });
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

                <Row type="flex" justify="center" align="middle">
                    <Drawer
                        title="Create"
                        width={720}
                        placement="right"
                        onClose={this.onClose}
                        maskClosable={false}
                        visible={this.state.visible}
                        style={{
                            height: 'calc(100% - 55px)',
                            overflow: 'auto',
                            paddingBottom: 53,
                        }}
                    >
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('nome', {
                                    rules: [{ required: true, message: 'Inserisci il tuo nome' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nome" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('cognome', {
                                    rules: [{ required: true, message: 'Inserisci il tuo cognome' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cognome" />
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'Inserisci un email valida',
                                    }, {
                                        required: true, message: 'Inserisci la tua email',
                                    }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                )}
                            </Form.Item>
                        </Form>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e8e8e8',
                                padding: '10px 16px',
                                textAlign: 'right',
                                left: 0,
                                background: '#fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >
                            <Button
                                style={{
                                    marginRight: 8,
                                }}
                                onClick={this.onClose}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>Salva</Button>
                        </div>
                    </Drawer>
                    <Col span={22} >
                        <Row type="flex" justify="end" align="middle">
                            <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.showDrawer}/>
                        </Row>
                    </Col>
                </Row>

        );
    }
}

export default Form.create()(NormalLoginForm);