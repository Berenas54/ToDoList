import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, toDoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    removeToDoList:(toDoListID: string)=> void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>(" ")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }

        return <li className={task.isDone ? "is-done" : ""} key={task.id}>
            <input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={removeTask}> X</button>
        </li>
    })


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle, props.id)

        } else {
            setError("Title is required!")
        }
        setTitle('')
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)


    return (<div>
            <h3>{props.title} <button onClick={()=>props.removeToDoList(props.id)}>X</button></h3>
            <div>
                <input value={title} className={error ? "error" : ""} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                 <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
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