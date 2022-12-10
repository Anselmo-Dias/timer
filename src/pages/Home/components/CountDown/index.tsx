import { useContext } from 'react'
import { CyclesContext } from '../..'
import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  const { minutes, seconds } = useContext(CyclesContext)

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
