import React, {useState} from "react";
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
    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} className={error ? "error" : ""} onChange={(e) => {
                    setError(null)
                    setTitle(e.currentTarget.value)

                }}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") addTask()
                       }}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul> {
                props.tasks.map(task =>
                    <li key={task.id}>
                        <input onChange={(e) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }} type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {
                            props.removeTask(task.id)
                        }}> X
                        </button>

                    </li>)
            }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}