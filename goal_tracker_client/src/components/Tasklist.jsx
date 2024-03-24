import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListForm from "./ListForm";
import { getTaskModel, getTaskChildrenModels } from "../view_models/task";
import { getGlobalUser, setGlobalUser } from "../utils/user_state";
import { config } from "../utils/config";
import TaskGrid from "./TaskGrid";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddEditTaskModal from "./AddEditTaskModal";
import Button from "react-bootstrap/Button";

const Tasklist = (props) => {
    const { userid } = useParams();
    const api_uri = config.api_uri;

    const emptyTaskModel = {
        _id: undefined,
        name: undefined,
        points: undefined,
        bonus: {
            name: undefined,
            points: undefined,
        },
        type: undefined,
        priority: undefined,
    };

    const [username, setUsername] = useState("");
    const [allUserTasks, setAllUserTasks] = useState(null);
    const [dailyTasks, setDailyTasks] = useState([]);
    const [bonusTasks, setBonusTasks] = useState([]);
    const [specialTasks, setSpecialTasks] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [editTaskModel, setEditTaskModel] = useState(emptyTaskModel);

    const handleModalClose = () => {
        setEditTaskModel(emptyTaskModel);
        setModalShow(false);
    };
    const handleModalShow = () => setModalShow(true);

    // useEffect(() => {
    //     if (props.username.name) {
    //         props.setUsername(props.username.name);
    //         setUsername(props.username.name);
    //     } else {
    //         //console.log("api call", `http://localhost:8082/api/user/${userid}`);
    //         axios
    //             .get(`http://localhost:8082/api/user/${userid}`)
    //             .then((res) => {
    //                 props.setUsername(res.data.name);
    //                 setUsername(res.data.name);
    //             })
    //             .catch((err) => {
    //                 console.error("could not get user", err);
    //             });
    //     }
    // }, [userid]);

    useEffect(() => {
        console.log("userid changed", userid);
        if (!username) {
            setupUser();
        }
        if (!allUserTasks) {
            gatherTasks();
        }
    }, [userid]);

    useEffect(() => {
        console.log("allUserTasks changed", allUserTasks);
        if (!allUserTasks) {
            return;
        }
        setDailyTasks(
            allUserTasks.filter((task) => {
                return task.type == "daily";
            })
        );
        setBonusTasks(
            allUserTasks.filter((task) => {
                return task.type == "bonus";
            })
        );
        setSpecialTasks(
            allUserTasks.filter((task) => {
                return task.type == "special";
            })
        );
    }, [allUserTasks]);

    const setupUser = () => {
        console.log("setting up user");
        if (getGlobalUser()) {
            setUsername(getGlobalUser().name);
        } else {
            axios
                .get(api_uri(`user/${userid}`))
                .then((res) => {
                    setUsername(res.data.name);
                    setGlobalUser(res.data.name);
                })
                .catch((err) => {
                    console.error("could not get user", err);
                });
        }
    };

    const gatherTasks = () => {
        axios
            .get(api_uri(`user/${userid}/tasks`))
            .then((res) => {
                const tasks = res.data;
                console.log("returning tasks:", res.data);
                setAllUserTasks(tasks);
            })
            .catch((err) => {
                console.err("Error from ShowBookDetails");
            });
    };

    const resetTasks = () => {
        setAllUserTasks(null);
    };

    const todayName = new Date().toLocaleDateString("en-us", {
        weekday: "long",
    });

    // <ListForm
    //     name={"Task"}
    //     model={getTaskModel()}
    //     children={getTaskChildrenModels()}
    // />;

    return (
        <>
            <h1>
                Hello {username}! These are your tasks for this beautiful{" "}
                {todayName}
            </h1>

            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>Daily</Tab>
                    <Tab>Bonus</Tab>
                    <Tab>Special</Tab>
                    <Button variant="primary" onClick={() => handleModalShow()}>
                        Add a Task, Bro
                    </Button>
                </TabList>
                <TabPanel>
                    <TaskGrid
                        tasks={dailyTasks}
                        taskModel={editTaskModel}
                        modalShow={() => handleModalShow()}
                        handleClose={() => handleModalClose()}
                        setTask={(task) => setEditTaskModel(task)}
                    />
                </TabPanel>
                <TabPanel>
                    <TaskGrid
                        tasks={bonusTasks}
                        taskModel={editTaskModel}
                        modalShow={() => handleModalShow()}
                        handleClose={() => handleModalClose()}
                        setTask={(task) => setEditTaskModel(task)}
                        title="Bonus Tasks"
                    />
                </TabPanel>
                <TabPanel>
                    <TaskGrid
                        tasks={specialTasks}
                        taskModel={editTaskModel}
                        modalShow={() => handleModalShow()}
                        handleClose={() => handleModalClose()}
                        setTask={(task) => setEditTaskModel(task)}
                        title="Special Tasks"
                    />
                </TabPanel>
            </Tabs>
            <AddEditTaskModal
                show={modalShow}
                task={editTaskModel}
                setTasks={(tasks) => setAllUserTasks(tasks)}
                handleShow={() => handleModalShow()}
                handleClose={() => handleModalClose()}
                title="Daily Tasks"
            />
        </>
    );
};

export default Tasklist;
