import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "React", isDone: false},
        {id: 2, title: "Html", isDone: true},
        {id: 3, title: "CSS", isDone: true},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "SaSS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>

    );
}

export default App;
