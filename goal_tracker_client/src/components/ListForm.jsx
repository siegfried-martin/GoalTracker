import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListFormList from "./ListFormList";
import ListFormForm from "./ListFormForm";

const ListForm = (props) => {
    return (
        <>
            <ListFormList name={props.name} />
            <ListFormForm
                name={props.name}
                model={props.model}
                createuri={props.createuri}
                children={props.children}
                columns={props.columns}
            />
        </>
    );
};

export default ListForm;
