import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import axios from "axios/index";

const { Option } = Select;

class UpdateDrawer extends React.Component {
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

    handleEdit = (e) => {
        let self = this;
        console.log("handle submit");
        e.preventDefault();
        this.setState({
            visible: false,
        });

        this.props.form.validateFields((err, values) => {

            if (!err) {
                axios.put('http://127.0.0.1:3000/users/'+this.props.itemId, values).then(res => {
                    console.log(res);
                    self.props.getList();
                });
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="secondary" onClick={this.showDrawer}>
                    Modifica
                </Button>
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
                    <Form onSubmit={this.handleEdit} className="login-form" >
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
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleEdit}>Salva</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(UpdateDrawer);

