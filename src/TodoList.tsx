import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            <input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>
            <EditableSpan title={task.title}
                          changeValue={changeTaskTitle}/>
            <button onClick={removeTask}> &#xD7;</button>
        </li>
    })


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)


    return (<div>
            <h3>
                <EditableSpan title={props.title} changeValue={changeToDoListTitle}/>
                <button onClick={() => props.removeToDoList(props.id)}>&#xD7;</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}