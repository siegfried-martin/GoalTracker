import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListFormList = (props) => {
    return (
        <>
            <h2>List of {props.name}</h2>
        </>
    );
};

export default ListFormList;
