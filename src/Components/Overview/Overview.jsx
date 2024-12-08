import React from 'react'
import { Box } from '@mui/material'
import PieChart from '../Charts/PieChart'
import Cards from "../Cards/Cards"
import BarChart from '../Charts/BarChart'


export default function Overview() {
    return (
        <div>
            <Box sx={{ width: '100%', height: '90%' }}>
                <Cards />
                <Box sx={{ display: 'flex', marginTop: '70px' }}>
                    <BarChart />
                </Box>
            </Box>
        </div>
    )
}

