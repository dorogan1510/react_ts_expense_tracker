import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IchartData {
    id: number
    x?: string
    y: number | string
}

interface IchartDataState {
    chart: IchartData[]
}

const initialState: IchartDataState = {
    chart: [],
}

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setChart: (state, action: PayloadAction<IchartData>) => {
            state.chart = [
                ...state.chart,
                {
                    id: Math.random(),
                    x: action.payload.x,
                    y: action.payload.y,
                },
            ]
            const temp = JSON.stringify(state.chart)
            localStorage.setItem('chart', temp)
        },
        setChartSame: (state, action: PayloadAction<IchartData[]>) => {
            state.chart = action.payload
            const temp = JSON.stringify(state.chart)
            localStorage.setItem('chart', temp)
        },
        deleteChart: (state, action: PayloadAction<IchartData[]>) => {
            state.chart = action.payload
            const temp = JSON.stringify(state.chart)
            localStorage.setItem('chart', temp)
        },

        setChartToLocalStorage: (
            state,
            action: PayloadAction<IchartData[]>
        ) => {
            state.chart = action.payload
        },
    },
})

export const { setChart, setChartSame, deleteChart, setChartToLocalStorage } =
    chartSlice.actions
export default chartSlice.reducer
