import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const TaskGrid = ({
    tasks,
    title,
    taskModel,
    modalShow,
    handleClose,
    setTask,
}) => {
    const handleTaskComplete = (task) => {
        setTask(task);
        console.log("task Edit clicked", task);
    };

    const handleTaskEditClick = (task) => {
        setTask(task);
        console.log("task Edit clicked", task);
        modalShow();
    };

    const handleTaskDeleteClick = (task) => {
        setTask(task);
        console.log("task Delete clicked", task);
    };

    console.log("tasks from TaskGrid", tasks);
    const taskRows = tasks.map((task) => {
        let obj = [];
        obj.push(
            <tr id={`task-row-${task._id}`}>
                <td>{task.name}</td>
                <td>{task.points}</td>
                <td>
                    <div className="row">
                        <div className="col-sm-4">
                            <button
                                style={{ width: "100%" }}
                                className="btn btn-info"
                                onClick={() => {
                                    handleTaskComplete(task);
                                }}
                            >
                                Complete Task
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button
                                style={{ width: "100%" }}
                                className="btn btn-success"
                                onClick={() => {
                                    handleTaskEditClick(task);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button
                                style={{ width: "100%" }}
                                className="btn btn-danger"
                                onClick={() => {
                                    handleTaskDeleteClick(task);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
        if (task?.bonus?.name) {
            obj.push(
                <tr id={`task-bonus-${task._id}`}>
                    <td>
                        <div style={{ marginLeft: "25px" }}>
                            {task.bonus.name}
                        </div>
                    </td>
                    <td>
                        <div style={{ marginLeft: "25px" }}>
                            {task.bonus.points}
                        </div>
                    </td>
                </tr>
            );
        }
        return obj;
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th colSpan={3}>{title}</th>
                </tr>
                <tr>
                    <th>Task</th>
                    <th>Points</th>
                    <th>Controls</th>
                </tr>
            </thead>
            <tbody>{taskRows}</tbody>
        </Table>
    );
};

export default TaskGrid;
