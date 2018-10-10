import React from 'react';
import {Button, Modal} from "antd";
import axios from 'axios';


const buttonDelete = (props) => (
    <Button type="danger" key={props.itemId} onClick={(e)=>{props.handleDelete(props.itemId)}}>elimina</Button>
)

export default buttonDelete;