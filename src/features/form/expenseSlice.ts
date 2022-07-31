import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Iexpense {
    id: string
    title: string
    amount: number
    date: any
}

interface IexpenseSliceState {
    expense: Iexpense[]
}

const initialState: IexpenseSliceState = {
    expense: [],
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setExpense: (state, action) => {
            state.expense = [
                ...state.expense,
                {
                    id: action.payload[0].id,
                    title: action.payload[0].title,
                    amount: action.payload[0].amount,
                    date: action.payload[0].date,
                },
            ]
        },
    },
})

export const { setExpense } = expenseSlice.actions
export default expenseSlice.reducer
