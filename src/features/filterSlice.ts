import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IfilteredMonthState {
    month: string
}

const initialState: IfilteredMonthState = {
    month: new Date().getMonth().toString(),
}

export const expenseSlice = createSlice({
    name: 'filteredMonth',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<string>) => {
            state.month = action.payload
        },
    },
})

export const { changeMonth } = expenseSlice.actions
export default expenseSlice.reducer
