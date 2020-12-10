import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddToDoListAT = {
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeToDoListAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    id: string
}
export type ChangeToDoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType,
    id: string
}

type ActionType = RemoveToDoListAT | AddToDoListAT | ChangeToDoListAT | ChangeToDoListFilterAT


export const toDoListsReducer = (state: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newToDoListID: string = v1()
            const newToDoList: ToDoListType = {
                id: newToDoListID,
                title: action.title,
                filter: "all"
            }
            return [...state, newToDoList]
        case  'CHANGE-TODOLIST-TITLE': {
            const toDoList = state.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.title = action.title
                return [...state]
            }
            return state
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const toDoList = state.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            throw new Error("I don't understand this type")

    }
}
