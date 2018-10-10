import React from 'react';
import {Divider, Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import UsersList from "./UsersList";
import AddUsersForm from "./AddUsersForm";
import {Modal} from "antd/lib/index";
import axios from "axios/index";


export default class UsersApp extends React.Component{
    render(){
        return (
            <div>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Divider orientation="left">Add User</Divider>
                        <UsersList/>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </div>
        )
    }
}