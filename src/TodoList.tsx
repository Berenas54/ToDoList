import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>(" ")
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== ""){
            props.addTask(trimmedTitle)
            setTitle('')
        }
    }
    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
                onKeyPress={(e)=> {if (e.key === "Enter")addTask()}}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul> {
                props.tasks.map(task => <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => {
                        props.removeTask(task.id)
                    }}> X
                    </button>
                </li>)
            }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}