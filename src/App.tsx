import React, { useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import { Box, Paper } from '@mui/material'
import ExpenseList from './components/ExpenseList'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green, lightBlue } from '@mui/material/colors'
import { Iexpense, setExpenseToLocalStorage } from './features/expenseSlice'
import { deleteChart, setChartToLocalStorage } from './features/chartSlice'
import { chart } from './store/store'

const App = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: lightBlue[700],
            },
            secondary: {
                main: green[500],
            },
        },
    })

    const dispatch = useDispatch()
    const chartAmount = useSelector(chart)

    useEffect(() => {
        const temp: any = localStorage.getItem('expense')
        const loadedExpense = JSON.parse(temp)

        if (loadedExpense) {
            dispatch(
                setExpenseToLocalStorage(
                    loadedExpense.map((item: Iexpense) => ({
                        id: item.id,
                        title: item.title,
                        amount: item.amount,
                        date: new Date(item.date),
                    }))
                )
            )
        }
    }, [])
    useEffect(() => {
        const temp: any = localStorage.getItem('chart')
        const loadedChart = JSON.parse(temp)

        if (loadedChart) {
            dispatch(setChartToLocalStorage(loadedChart))
        }
    }, [])

    useEffect(() => {
        const chartAmountYNull = chartAmount.find(item => item.y === 0)
        if (chartAmountYNull) {
            dispatch(
                deleteChart(
                    chartAmount.filter(({ id }) => id !== chartAmountYNull.id)
                )
            )
        }
    }, [chartAmount])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ margin: '0 auto', maxWidth: 900 }}>
                <Paper elevation={5} sx={{ marginBottom: 2 }}>
                    <ExpenseForm />
                </Paper>
                <ExpenseList />
            </Box>
        </ThemeProvider>
    )
}

export default App
