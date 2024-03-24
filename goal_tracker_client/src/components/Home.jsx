import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getGlobalUser, setGlobalUser } from "../utils/user_state";

const Home = ({ setUsername }) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [curUser, setCurUser] = useState({});

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        console.log("using effect");

        if (getGlobalUser()) {
            setCurUser(getGlobalUser());
        }

        axios
            .get("http://localhost:8082/api/user")
            .then((res) => {
                const tempUsers = res.data;
                if (!curUser._id || tempUsers.length != users.length) {
                    setCurUser(tempUsers[0]);
                    setGlobalUser(tempUsers[0]);
                    setUsername(tempUsers[0].name);
                    setUsers(tempUsers);
                }
            })
            .catch((err) => {
                console.log("Error from ShowBookDetails");
            });
    }, []);

    const onClick = () => {
        navigate(`user/${curUser._id}/tasks`);
    };

    const onUserClick = (user) => {
        setCurUser(user);
        setGlobalUser(user);
        setUsername(user.name);
    };

    const onChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8082/api/user", newUser)
            .then((res) => {
                console.log("new user created", res.data);
                setNewUser({
                    name: "",
                    email: "",
                });
                // Push to /
                //navigate("/");
            })
            .catch((err) => {
                console.log("Error in Create User!");
            });
    };

    const userList = users.map((user, k) => {
        console.log(user);
        return (
            <div className="container" key={k}>
                <div className="row bg-info" onClick={() => onUserClick(user)}>
                    <div className="col-sm-3">Name:</div>
                    <div className="col-sm-3">{user.name}</div>
                    <div className="col-sm-3">Email:</div>
                    <div className="col-sm-3">{user.email}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Goal:</div>
                    <div className="col-sm-3">
                        {user.total_daily_goal_weight}
                    </div>
                    <div className="col-sm-3">Completed:</div>
                    <div className="col-sm-3">
                        {user.completed_daily_goal_weight}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <h2>welcome {curUser.name}</h2>
            <button onClick={() => onClick()}>show tasks</button>
            <div>Users:</div>
            {userList}

            <p className="lead text-center">Create new user</p>
            <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="user name"
                        name="name"
                        className="form-control"
                        value={newUser.name}
                        onChange={onChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="user email"
                        name="email"
                        className="form-control"
                        value={newUser.email}
                        onChange={onChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Home;
