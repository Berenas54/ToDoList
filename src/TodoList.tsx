import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, toDoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
    changeToDoListTitle: (title: string, toDoListID: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeToDoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.id)
    }

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id)
        }

        return <li className={task.isDone ? "is-done" : ""} key={task.id}>
            <Checkbox
                color={"primary"}
                onChange={changeTaskStatus}
                checked={task.isDone}
            />
            <EditableSpan title={task.title}
                          changeValue={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    })


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (<div>
            <h3>
                <EditableSpan title={props.title} changeValue={changeToDoListTitle}/>
                <IconButton onClick={() => props.removeToDoList(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:"none", paddingLeft:"0"}}>
                {tasks}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"} color={"primary"} size={"small"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} color={"primary"} size={"small"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} size={"small"}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}