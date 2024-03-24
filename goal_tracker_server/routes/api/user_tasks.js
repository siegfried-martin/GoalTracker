// routes/api/user_tasks.js

const express = require('express');
const router = express.Router();

const Task = require("../../models/Task");
const User = require("../../models/User");

//#region User Routes

// @route GET api/user/:userid
router.get("/:userid", (req, res) => {
    User.findById(req.params.userid)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nouserfound: "No User found" }));
});

// @route GET api/user
router.get("/", (req, res) => {
    User.find({}, "-tasks")
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: "No Users found" }));
});

// @route POST api/user
router.post("/", (req, res) => {
    User.create(req.body)
        .then(user => res.json({ msg: 'user added successfully' }))
        .catch(err => res.status(404).json({ error: `Unable to add user ${User.name}` }));
});

// @route PUT api/user/:userid
router.put("/:userid", (req, res) => {
    User.findByIdAndUpdate(req.params.userid, req.body)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ error: "Unable to udpate user" }));
});

//#endregion

//#region User Task Routes

// @route GET api/user/:userid/tasks
// get all tasks for 1 user
router.get("/:userid/tasks", (req, res) => {
    User.findById(req.params.userid)
        .then((user) => {
            console.log("user tasks", user.tasks)
            Task.find({ '_id': { $in: user.tasks } })
                .then(tasks => res.json(tasks))
                .catch(err => res.status(404).json({ notaskfound: "Task not found for user " + req.params.userid, error: err }))
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ nouserfound: "User not found " + req.params.userid, error: err })
        });
});

// @route GET api/user/:userid/tasks/:taskid
// get 1 task for 1 user
router.get("/:userid/tasks/:taskid", (req, res) => {
    User.findById(req.params.userid)
        .then((user) => {
            tasks = user.tasks.id(req.params.taskid)
            Tasks.find({ '_id': { $in: tasks } })
                .then(tasks => res.json(tasks))
                .catch(err => res.status(404).json({ notaskfound: "Task not found for user " + req.params.userid }))
        })
        .catch(err => res.status(404).json({ notaskfound: "User not found " + req.params.userid }));
});

// @route POST api/user/addtask
// add task
router.post("/:userid/addtask", (req, res) => {
    User.findById(req.params.userid)
        .then(user => {
            //const task = new Task(req.body);
            //Task.validate(task)
            Task.create(req.body)
                .then(task => {
                    user.tasks.push(task);
                    user.save()
                        .then(() => res.json(user.tasks))
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({ error: err, message: "unable to save task to user" })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ error: err })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: err })
        })
});

// @route PUT api/user/:userid/tasks/:taskid
// update 1 task for 1 user
router.put("/:userid/tasks/:taskid", (req, res) => {
    User.findById(req.params.userid)
        .then(user => {
            Task.findByIdAndUpdate(user.tasks.id(req.params.taskid))
                .then(task => res.json(task))
        })
        //.then(user => res.json(user.tasks.id(req.params.taskid)))
        .catch(err => res.status(404).json({ notaskfound: "Task not found for user " + req.params.userid }));
});

// @route DELETE api/user/:userid/tasks/:taskid
// delete 1 task for 1 user
router.delete("/:userid/tasks/:taskid", (req, res) => {
    User.findById(req.params.userid)
        .then(user => {
            user.tasks = user.tasks.filter(taskid => taskid != req.params.taskid)
            user.save()
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ error: err })
                })
            Task.findByIdAndDelete(user.tasks.id(req.params.taskid))
                .then(task => res.json(task))
        })
        //.then(user => res.json(user.tasks.id(req.params.taskid)))
        .catch(err => res.status(404).json({ notaskfound: "Task not found for user " + req.params.userid }));
});


//#endregion

//#region Task Routes

// @route GET api/user/tasks/getall
// get all tasks, should NOT be used except testing
router.get("/tasks/getall", (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json({ notaskfound: "No Tasks found" }));
});

// @route GET api/user/tasks/:taskid
router.get("/tasks/:taskid", (req, res) => {
    Task.findById(req.params.taskid)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ notaskfound: "No Task found" }));
});

// @route PUT api/user/tasks/:taskid
router.put("/tasks/:taskid", (req, res) => {
    Task.findByIdAndUpdate(req.params.taskid, req.body, { new: true })
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ error: "Unable to udpate user" }));
});

// @route   DELETE api/user/tasks/:taskid
// should not be used except testing
router.delete('/tasks/:taskid', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(task => res.json({ mgs: 'Book entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a task' }));
});

//#endregion


module.exports = router;