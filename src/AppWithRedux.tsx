import React from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {

    const toDoListID1 = v1()
    const toDoListID2 = v1()

  const todoLists = useSelector<AppRootStateType,Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TaskStateType>(state => state.tasks)
    const dispatch =useDispatch()

    function removeTask(taskID: string, toDoListID: string) {
        const action = RemoveTaskAC(taskID, toDoListID)
        dispatch(action)
    }

    function addTask(title: string, toDoListID: string) {
        const action = AddTaskAC(title, toDoListID)
        dispatch(action)
    }


    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        const action = ChangeToDoListFilterAC(newFilterValue, toDoListID)
        dispatch(action)
    }


    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const action = ChangeTaskStatusAC(taskID, isDone, toDoListID)
        dispatch(action)
    }

    function changeTaskSTitle(taskID: string, title: string, toDoListID: string) {
        const action = ChangeTaskTitleAC(taskID, title, toDoListID)
        dispatch(action)
    }


    function changeToDoListTitle(title: string, id: string) {
        const action = ChangeToDoListTitleAC(title, id)
        dispatch(action)

    }

    function RemoveToDoList(id: string) {
        const action = RemoveToDoListAC(id)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddToDoListAC(title)
        dispatch(action)
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
                    {todoLists.map(tl => {
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

export default AppWithRedux;
