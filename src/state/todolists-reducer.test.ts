import {
    AddToDoListAT,
    ChangeToDoListAT,
    ChangeToDoListFilterAT,
    RemoveToDoListAT,
    toDoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = toDoListsReducer(startState, RemoveToDoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, AddToDoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, ChangeToDoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, ChangeToDoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

export const RemoveToDoListAC = (toDoListID: string): RemoveToDoListAT => (
    {type: "REMOVE-TODOLIST", id: toDoListID}
)
export const AddToDoListAC = (newTitle: string): AddToDoListAT => (
    {type: "ADD-TODOLIST", title: newTitle}
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