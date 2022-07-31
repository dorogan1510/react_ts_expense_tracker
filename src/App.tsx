import React from 'react'
import ExpenseForm from './components/ExpenseForm'
import { Box, Paper } from '@mui/material'

const App = () => {
    return (
        <>
            <Box sx={{ margin: '0 auto', maxWidth: 900 }}>
                <Paper elevation={5}>
                    <ExpenseForm />
                </Paper>
            </Box>
        </>
    )
}

export default App
