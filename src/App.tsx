import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "SaSS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let tasksForToDoList = tasks
    if (filter === "active") {
        tasksForToDoList = tasks.filter(task => !task.isDone) //= false
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(task => task.isDone) //=true
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForToDoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>

    );
}

export default App;
