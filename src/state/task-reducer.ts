import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";

export type RemoveTaskAT = {
    type: "REMOVE-TASK",
    taskID: string,
    toDoListID: string
}
export type AddTaskAT = {
    type: "ADD-TASK"
    newTitle: string
    toDoListID: string
}
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string,
    isDone: boolean,
    toDoListID: string
}

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT


export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.toDoListID] = copyState[action.toDoListID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case 'ADD-TASK': {
            let task: TaskType = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            let copyState = {...state}
            copyState[action.toDoListID] = [task, ...copyState[action.toDoListID]]
            return copyState
        }
        case "CHANGE-TASK-STATUS":{

return {...state,[action.toDoListID]:state[action.toDoListID].map(task=>{
    if (task.id!==action.taskID) return task
        else return {...task,isDone:action.isDone}
    })}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskID: string, toDoListID: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskID, toDoListID}
}
export const AddTaskAC = (newTitle: string, toDoListID: string): AddTaskAT => {
    return {type: "ADD-TASK", newTitle, toDoListID}
}
export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, toDoListID: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone,toDoListID}
}