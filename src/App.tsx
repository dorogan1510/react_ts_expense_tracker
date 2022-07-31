import React from 'react'
import ExpenseForm from './components/ExpenseForm'
import { Box, Paper } from '@mui/material'
import ExpenseList from './components/ExpenseList'

const App = () => {
    return (
        <>
            <Box sx={{ margin: '0 auto', maxWidth: 900 }}>
                <Paper elevation={5} sx={{ marginBottom: 2 }}>
                    <ExpenseForm />
                </Paper>
                <ExpenseList />
            </Box>
        </>
    )
}

export default App
