import {TaskStateType} from '../App';
import {tasksReducer, RemoveTaskAC, AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC} from "./task-reducer";
import {AddToDoListAC, RemoveToDoListAC} from "./todolists-reducer";

let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = RemoveTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
    expect(endState["todolistId2"][2]).toBeUndefined()

});


test('correct task should be added to correct array', () => {

    const action = AddTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {

    const action = ChangeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});
test('title of specified task should be changed', () => {

    const action = ChangeTaskTitleAC("2", "chips", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("chips");
    expect(endState["todolistId1"][1].title).toBe("JS");
});
test('correct todolist should be removed', () => {

    const endState = tasksReducer(startState, RemoveToDoListAC("todolistId2"))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe("todolistId1")
    expect(endState["todolistId2"]).toBeUndefined()
});

test('new array should be added when new todolist is added', () => {

    const action = AddToDoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
