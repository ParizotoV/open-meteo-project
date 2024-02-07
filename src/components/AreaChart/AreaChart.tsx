'use client'
import React from 'react'
import { AreaChart, AreaChartProps, Card, Title } from '@tremor/react'

interface AreaChartCardProps extends AreaChartProps {
  title: string
}

const AreaChartCard: React.FC<AreaChartCardProps> = ({ title, ...props }) => {
  return (
    <Card className='!bg-[#292249] rounded rounded-lg border-transparent border-t-4 border-[#B2A8EE]'>
      <Title className='!text-white text-lg text-center font-bold'>{title}</Title>
      <AreaChart {...props} />
    </Card>
  )
}

export default AreaChartCard
