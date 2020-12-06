import {StateType, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState: StateType = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe("Dimych ");

});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const  endState = userReducer(startState, {type:"INCREMENT-CHILDREN-COUNT"})
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
    expect(endState.name).toBe("Dimych");

});
test('should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const  endState = userReducer(startState, {type:"CHANGE-NAME", name:"Vika"})
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe("Vika");

});
