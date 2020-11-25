import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>(" ")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)

        } else {
            setError("Title is required!")
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                label={"Title"}
                helperText={error}
                error={!!error}
                variant={"outlined"}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addItem}>
                <AddBox color={"primary"}/>
            </IconButton>
        </div>
    )
}