import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Iexpense {
    id: string
    title: string
    amount: number | string
    date: any
}

interface IexpenseSliceState {
    expense: Iexpense[]
    filterExpense: Iexpense[]
}

const initialState: IexpenseSliceState = {
    expense: [],
    filterExpense: [],
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Iexpense>) => {
            state.expense = [
                ...state.expense,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    amount: action.payload.amount,
                    date: action.payload.date,
                },
            ]

            const temp = JSON.stringify(state.expense)
            localStorage.setItem('expense', temp)
        },
        deleteExpense: (state, action: PayloadAction<Iexpense>) => {
            state.expense = state.expense.filter(
                ({ id }) => id !== action.payload.id
            )
            state.filterExpense = state.filterExpense.filter(
                ({ id }) => id !== action.payload.id
            )
        },
        setFilterExpense: (state, action: PayloadAction<string>) => {
            state.filterExpense = state.expense.filter(item => {
                return item.date.getMonth().toString() === action.payload
            })
        },
        setNoFilterExpense: (state, action) => {
            state.expense = state.expense.filter(item => {
                return item
            })
        },
        setExpenseToLocalStorage: (
            state,
            action: PayloadAction<Iexpense[]>
        ) => {
            state.expense = action.payload
        },
    },
})

export const {
    addExpense,
    deleteExpense,
    setFilterExpense,
    setNoFilterExpense,
    setExpenseToLocalStorage,
} = expenseSlice.actions
export default expenseSlice.reducer
