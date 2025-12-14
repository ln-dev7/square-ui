import React, { useMemo } from 'react'
import Garland1 from '@/images/garlands/garland-1.png'
import Garland2 from '@/images/garlands/garland-2.png'
import Garland3 from '@/images/garlands/garland-3.png'

const garlandImages = {
  garland1: Garland1.src,
  garland2: Garland2.src,
  garland3: Garland3.src,
}

interface GarlandProps {
  type: 'garland1' | 'garland2' | 'garland3'
}

const Garland: React.FC<GarlandProps> = ({ type }) => {
  const getPositionClass = () => {
    switch (type) {
      case 'garland1':
        return '-top-6'
      case 'garland2':
        return '-top-[4.5rem]'
      case 'garland3':
        return '-top-[3.125rem]'
      default:
        return ''
    }
  }

  const getBackgroundPositionClass = () => {
    switch (type) {
      case 'garland1':
        return 'bg-[300%_top]'
      case 'garland2':
        return 'bg-[70%_top]'
      case 'garland3':
        return 'bg-[10%_top]'
      default:
        return ''
    }
  }

  return (
    <div
      className={`pointer-events-none absolute left-0 z-50 h-[150px] w-full ${getPositionClass()} ${getBackgroundPositionClass()} `}
      style={{
        backgroundImage: `url(${garlandImages[type]})`,
        backgroundRepeat: 'repeat-x',
      }}
    />
  )
}

const Garlands: React.FC = () => {
  const isHolidaySeason = useMemo(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    return (
      currentMonth === 11 ||
      (currentMonth === 0 && currentDay <= 15)
    )
  }, [])

  if (!isHolidaySeason) {
    return null
  }

  return (
    <>
      <Garland type="garland1" />
      <Garland type="garland2" />
      <Garland type="garland3" />
    </>
  )
}

export default Garlands
