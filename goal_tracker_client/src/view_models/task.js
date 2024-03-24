const TaskModel = {
    name: {
        type: "string",
        displayValue: "",
    },
    points: {
        type: "number",
        displayValue: "",
    },
    variable_bonus: {
        type: "number",
        displayValue: "",
    },
    task_type: {
        type: "string",
        displayValue: "",
    },
    list_priority: {
        type: "number",
        displayValue: "",
    },
};

const childrenModels = {
    variable_bonus: {
        name: {
            type: "string",
            displayValue: "",
        },
        points: {
            type: "number",
            displayValue: "",
        },
    },
};

const getTaskModel = () => TaskModel;
const getTaskChildrenModels = () => childrenModels;

export { getTaskModel, getTaskChildrenModels };