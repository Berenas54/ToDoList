import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC,
    RemoveToDoListAC,
    toDoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/task-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const [toDoLists, dispatchToTodolist] = useReducer(toDoListsReducer, [
        {id: toDoListID1, title: 'Test text', filter: 'all'},
        {id: toDoListID2, title: 'What I know?', filter: 'all'}
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [toDoListID1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: "Cat", isDone: false},
            {id: v1(), title: "Rabbit", isDone: true},
        ]
    })


    function removeTask(taskID: string, toDoListID: string) {
        const action = RemoveTaskAC(taskID, toDoListID)
        dispatchToTasks(action)
    }

    function addTask(title: string, toDoListID: string) {
        const action = AddTaskAC(title, toDoListID)
        dispatchToTasks(action)
    }


    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        const action = ChangeToDoListFilterAC(newFilterValue, toDoListID)
        dispatchToTodolist(action)
    }


    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const action = ChangeTaskStatusAC(taskID, isDone, toDoListID)
        dispatchToTasks(action)
    }

    function changeTaskSTitle(taskID: string, title: string, toDoListID: string) {
        const action = ChangeTaskTitleAC(taskID, title, toDoListID)
        dispatchToTasks(action)
    }


    function changeToDoListTitle(title: string, id: string) {
        const action = ChangeToDoListTitleAC(title, id)
        dispatchToTodolist(action)

    }

    function RemoveToDoList(id: string) {
        const action = RemoveToDoListAC(id)
        dispatchToTodolist(action)
    }

    function addTodoList(title: string) {
        const action = AddToDoListAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container={true} style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={3}>
                    {toDoLists.map(tl => {
                        let tasksForToDoList = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForToDoList = tasks[tl.id].filter(task => !task.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForToDoList = tasks[tl.id].filter(task => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper elevation={2} style={{padding: "0 0 10px 10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDoList}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeToDoList={RemoveToDoList}
                                        changeTaskTitle={changeTaskSTitle}
                                        changeToDoListTitle={changeToDoListTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers;
