import { configureStore } from '@reduxjs/toolkit'
import expenseSlice from '../features/form/expenseSlice'
import formSlice from '../features/form/formSlice'

export const store = configureStore({
    reducer: {
        form: formSlice,
        expense: expenseSlice,
    },
})

type RootState = ReturnType<typeof store.getState>

export const selectTitle = (state: RootState) => state.form.title
export const selectAmount = (state: RootState) => state.form.amount
export const selectDate = (state: RootState) => state.form.date
export const expense = (state: RootState) => state.expense.expense
