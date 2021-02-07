import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";


export default {
    title: 'Example/Task',
    component: Task
} as Meta;

const removeCallback = action("Remove callback was clicked")
const changeStatusCallback = action("Change status callback was clicked")
const changeTitleCallback = action("Change title callback was clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
const baseArgs = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback

}

export const isNotCompletedTask = Template.bind({});
isNotCompletedTask.args = {
    todolistId: "id1",
    ...baseArgs,
    task: {id: "1", isDone: false, title: "CSS"}
};

export const isCompletedTask = Template.bind({});
isCompletedTask.args = {
    todolistId: "id2",
    ...baseArgs,
    task: {id: "2", isDone: true, title: "JS"}
};

