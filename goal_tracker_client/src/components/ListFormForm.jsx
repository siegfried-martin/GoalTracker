import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListFormForm = (props) => {
    const createModelInstance = (modelDefinition) => {
        let ret = {};
        if ("created" in modelDefinition) {
        }
        //console.log("creating new model instance", modelDefinition);
        Object.keys(modelDefinition).forEach((key) => {
            if (modelDefinition[key].type == "array") {
                ret[key] = [];
            } else if (modelDefinition[key].type == "object") {
                const childDefinition = props.children[key];
                ret[key] = createModelInstance(childDefinition);
            } else {
                ret[key] = undefined;
            }
        });
        return ret;
    };

    const [model, setModel] = useState(createModelInstance(props.model));

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post(props.createUri, newUser)
            .then((res) => {
                //console.log("about to set model");
                setModel(createModelInstance(props.model));
            })
            .catch((err) => {});
    };

    const getModelInputs = (modelDefinition, modelInstance) => {
        const aggregatedInputs = getAggregatedInputs(
            modelDefinition,
            modelInstance
        );
        return aggregatedInputs.map((inputArray, i) => {
            return (
                <div className="row" key={"input-row-" + i}>
                    {inputArray}
                </div>
            );
        });
    };

    const getAggregatedInputs = (modelDefinition, modelInstance) => {
        const cols = props.columns || 3;
        let inputAggregator = [];
        let tempInputs = [];
        let count = 0;
        for (let key in modelDefinition) {
            const isChild = modelDefinition[key].type in ["array", "object"];
            const inputContainer = getInputContainer(
                modelDefinition,
                key,
                modelInstance
            );
            if (isChild || ++count == cols + 1) {
                count = 0;
                if (tempInputs.length) {
                    inputAggregator.push(tempInputs);
                    tempInputs = [];
                }

                if (isChild) {
                    inputAggregator.push([inputContainer]);
                } else {
                    tempInputs.push(inputContainer);
                    tempInputs = [];
                }
            }
            if (!isChild) {
                tempInputs.push(inputContainer);
            }
        }
        if (tempInputs.length) {
            inputAggregator.push(tempInputs);
        }
        return inputAggregator;
    };

    const getInputContainer = (modelDefinition, key, modelInstance) => {
        return (
            <div className="input-container col-sm-4 float-left" key={key}>
                <label>{key}</label>
                <br />
                {getInput(modelDefinition, key, modelInstance)}
            </div>
        );
    };

    const getInput = (modelDefinition, key, modelInstance) => {
        const varType = modelDefinition[key].type;
        let ret = null;
        switch (varType) {
            case "boolean":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="checkbox"
                    ></input>
                );
                break;
            case "number":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="number"
                    ></input>
                );
                break;
            case "string":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="text"
                    ></input>
                );
                break;
            case "date":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="date"
                    ></input>
                );
                break;
            case "time":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="time"
                    ></input>
                );
                break;
            case "email":
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="email"
                    ></input>
                );
                break;
            case "array":
                ret = (
                    <div className="container child-input-container">
                        {getChildInputs(modelDefinition, key, modelInstance)}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addRow(key, modelInstance);
                            }}
                        >
                            + Add {key}
                        </button>
                    </div>
                );
                break;
            case "object":
                ret = (
                    <div className="container child-input-container">
                        {getChildInputs(modelDefinition, key, modelInstance)}
                    </div>
                );
                break;
            default:
                ret = (
                    <input
                        value={modelInstance[key]}
                        name={key}
                        type="text"
                    ></input>
                );
        }
        return ret;
    };

    const addRow = (key, modelInstance) => {
        const childDefinition = props.children[key];
        modelInstance[key].push(createModelInstance(childDefinition));
        //setModel(model);
        setModel(JSON.parse(JSON.stringify(model)));
    };

    const getChildInputs = (modelDefinition, key, modelInstance) => {
        const childDefinition = props.children[key];
        const childInstance = modelInstance[key];
        if (modelDefinition[key].type == "array") {
            return childInstance.map((instance) => {
                return getModelInputs(childDefinition, instance);
            });
        }
        return getModelInputs(childDefinition, childInstance);
    };

    const testfunc = () => {
        console.log("about to set model");
        setModel(createModelInstance(props.model));
    };

    return (
        <>
            <form>
                <div className="container">
                    {getModelInputs(props.model, model)}
                    <div className="row">
                        <button type="submit">Create New {props.name}</button>
                    </div>
                </div>
            </form>
            <button onClick={testfunc}>Manually set model</button>
        </>
    );
};

export default ListFormForm;
