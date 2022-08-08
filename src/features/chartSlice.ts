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
        setChart: (state, action) => {
            state.chart = [
                ...state.chart,
                {
                    id: Math.random(),
                    x: action.payload.x,
                    y: action.payload.y,
                },
            ]
        },
        setChartSame: (state, action) => {
            state.chart = action.payload
        },
        deleteChart: (state, action) => {
            state.chart = state.chart.filter(
                ({ id }) => id !== action.payload.id
            )
        },
    },
})

export const { setChart, setChartSame, deleteChart } = chartSlice.actions
export default chartSlice.reducer
