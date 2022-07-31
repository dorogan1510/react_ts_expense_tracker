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
        addExpense: (state, action) => {
            state.expense = [
                ...state.expense,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    amount: action.payload.amount,
                    date: action.payload.date,
                },
            ]
        },
        deleteExpense: (state, action) => {
            state.expense = state.expense.filter(
                ({ id }) => id !== action.payload.id
            )
        },
    },
})

export const { addExpense, deleteExpense } = expenseSlice.actions
export default expenseSlice.reducer
