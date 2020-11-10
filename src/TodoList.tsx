import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>(" ")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle)

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
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")


    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} className={error ? "error" : ""} onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul> {
                props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id)
                    return <li className={task.isDone ? "is-done" : ""} key={task.id}>

                        <input onChange={(e) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }} type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}> X</button>
                    </li>
                })
            }
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