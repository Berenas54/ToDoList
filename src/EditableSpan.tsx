import React, {ChangeEvent, useState} from "react";

type editableSpanType = {
    title: string
    changeValue: (newValue: string) => void
}

export function EditableSpan(props: editableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (editMode
            ? <input onBlur={deActivatedEditMode} onChange={onChangeTitle} value={title} autoFocus={true}/>
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
}