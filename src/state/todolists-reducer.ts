import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddToDoListAT = {
    type: "ADD-TODOLIST",
    title: string
    todolistId:string
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

const initialState:Array<ToDoListType>=[]

export const toDoListsReducer = (state: Array<ToDoListType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newToDoList: ToDoListType = {
                id: action.todolistId,
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
         return state

    }
}
export const RemoveToDoListAC = (toDoListID: string): RemoveToDoListAT => (
    {type: "REMOVE-TODOLIST", id: toDoListID}
)
export const AddToDoListAC = (newTitle: string): AddToDoListAT => (
    {type: "ADD-TODOLIST", title: newTitle, todolistId:v1()}
)
export const ChangeToDoListTitleAC = (title: string, id: string): ChangeToDoListAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    id: id
})
export const ChangeToDoListFilterAC = (filter: FilterValuesType, id: string): ChangeToDoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter
})
