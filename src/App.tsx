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

type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListID1, title: 'Test text', filter: 'all'},
        {id: toDoListID2, title: 'What I know?', filter: 'all'}
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
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
        const toDoListTasks = tasks[toDoListID]
        tasks[toDoListID] = toDoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, toDoListID: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[toDoListID] = [newTask, ...tasks[toDoListID]]
        setTasks({...tasks})
    }


    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.filter = newFilterValue
            setToDoLists([...toDoLists])
        }

    }

    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const task: TaskType | undefined = tasks[toDoListID].find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function RemoveToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {toDoLists.map(tl => {
                let tasksForToDoList = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForToDoList = tasks[tl.id].filter(task => !task.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForToDoList = tasks[tl.id].filter(task => task.isDone)
                }
                return (
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
                    />)
            })}
        </div>
    )
}

export default App;
