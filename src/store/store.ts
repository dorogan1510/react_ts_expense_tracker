import { configureStore } from '@reduxjs/toolkit'
import expenseSlice from '../features/expenseSlice'
import filteredMonthSlice from '../features/filterSlice'
import formSlice from '../features/formSlice'
import { Chart } from 'chart.js/auto'
import chartSlice from '../features/chartSlice'

export const store = configureStore({
    reducer: {
        form: formSlice,
        expense: expenseSlice,
        filteredMonth: filteredMonthSlice,
        chart: chartSlice,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

type RootState = ReturnType<typeof store.getState>

export const selectTitle = (state: RootState) => state.form.title
export const selectAmount = (state: RootState) => state.form.amount
export const selectDate = (state: RootState) => state.form.date
export const expense = (state: RootState) => state.expense.expense

export const filterExpense = (state: RootState) => state.expense.filterExpense
export const filteredMonth = (state: RootState) => state.filteredMonth.month
export const chart = (state: RootState) => state.chart.chart
