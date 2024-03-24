import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddEditTaskModal = (props) => {
    const { userid } = useParams();
    const api_uri = config.api_uri;
    const task = props.task;
    console.log("task?.name", task?.name);
    const inputModel = {
        name: useRef(task?.name),
        points: useRef(),
        bonus: {
            name: useRef(),
            points: useRef(),
        },
        type: useRef(),
        priority: useRef(),
    };

    const getSubmitModel = () => {
        const submitTask = {
            name: inputModel.name.current.value,
            points: inputModel.points.current.value,
            bonus: {
                name: inputModel.bonus.name.current.value,
                points: inputModel.bonus.points.current.value,
            },
            type: inputModel.type.current.value,
            priority: inputModel.priority.current.value,
        };
        if (task._id) {
            submitTask[_id] = task._id;
        }
        return submitTask;
    };

    const onFormSubmit = (event) => {
        console.log(getSubmitModel());
        event?.preventDefault();
        const submitModel = getSubmitModel();
        if ("_id" in submitModel) {
            updateTask(submitModel);
        } else {
            addTask(submitModel);
        }
    };
    const updateTask = (model) => {
        axios
            .put(api_uri(`user/${userid}/addtask`), model)
            .then((res) => {
                props.setTasks(null);
            })
            .catch((err) => {
                console.error("error in creating task", err);
            });
    };
    const addTask = (model) => {
        axios
            .post(api_uri(`user/${userid}/addtask`), model)
            .then((res) => {
                props.setTasks(null);
            })
            .catch((err) => {
                console.error("error in creating task", err);
            });
    };
    const handleSave = (event, something) => {
        onFormSubmit(event, something);
        props.handleClose();
    };
    //console.log("props", props);

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{!!task ? "Add" : "Edit"} Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={() => onFormSubmit()}>
                        <div className="row">
                            <div className="col-sm-4">Name</div>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    required={true}
                                    ref={inputModel.name}
                                    defaultValue={task?.name}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">Points</div>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    ref={inputModel.points}
                                    defaultValue={task?.points}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div
                                className="container"
                                style={{ marginLeft: "15px" }}
                            >
                                <h5 style={{ textAlign: "center" }}>
                                    Variable Bonus
                                </h5>
                                <div className="row">
                                    <div className="col-sm-4">Name</div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            ref={inputModel.bonus.name}
                                            defaultValue={task?.bonus?.name}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-4">Points</div>
                                    <div className="col-sm-8">
                                        <input
                                            type="number"
                                            ref={inputModel.bonus.points}
                                            defaultValue={task?.bonus?.points}
                                        />
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">Type</div>
                            <div className="col-sm-8">
                                <Form.Select
                                    name="type"
                                    ref={inputModel.type}
                                    defaultValue={task?.type}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="bonus">Bonus</option>
                                    <option value="special">Special</option>
                                </Form.Select>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-4">Priority</div>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    ref={inputModel.priority}
                                    defaultValue={task?.priority}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddEditTaskModal;
