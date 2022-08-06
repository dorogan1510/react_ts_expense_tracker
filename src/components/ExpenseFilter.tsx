import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormHelperText,
    Button,
    Box,
    Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterExpense } from '../features/expenseSlice'
import { filteredMonth } from '../store/store'

const ExpensesFilter = ({
    filterChangeHandler,
    cancelFilterHandler,
}: {
    filterChangeHandler: Function
    cancelFilterHandler: any
}) => {
    const dropdownChangeHandler = (event: SelectChangeEvent) => {
        filterChangeHandler(event.target.value)
    }

    const dispatch = useDispatch()

    const selectedMonth = useSelector(filteredMonth)

    useEffect(() => {
        dispatch(setFilterExpense(selectedMonth))
    }, [selectedMonth])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography sx={{ display: 'inline-block' }}>
                    Filter by month
                </Typography>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={selectedMonth}
                        onChange={dropdownChangeHandler}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={'0'}>January</MenuItem>
                        <MenuItem value={'1'}>February</MenuItem>
                        <MenuItem value={'2'}>March</MenuItem>
                        <MenuItem value={'3'}>April</MenuItem>
                        <MenuItem value={'4'}>May</MenuItem>
                        <MenuItem value={'5'}>June</MenuItem>
                        <MenuItem value={'6'}>July</MenuItem>
                        <MenuItem value={'7'}>August</MenuItem>
                        <MenuItem value={'8'}>September</MenuItem>
                        <MenuItem value={'9'}>October</MenuItem>
                        <MenuItem value={'10'}>November</MenuItem>
                        <MenuItem value={'11'}>December</MenuItem>
                    </Select>
                </FormControl>

                <Button type='button' onClick={cancelFilterHandler}>
                    Cancel
                </Button>
            </Box>
        </motion.div>
    )
}

export default ExpensesFilter
