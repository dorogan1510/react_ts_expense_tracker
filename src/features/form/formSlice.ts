import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IformSliceState {
    title: string
    amount: number | string
    date: null | string | Date
}

const initialState: IformSliceState = {
    title: '',
    amount: '',
    date: null,
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setAmount: (state, action: PayloadAction<number | string>) => {
            state.amount = action.payload
        },
        setDate: (state, action: PayloadAction<null | string | Date>) => {
            state.date = action.payload
        },
    },
})

export const { setTitle, setAmount, setDate } = formSlice.actions
export default formSlice.reducer
