import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import * as zod from 'zod'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { zodResolver } from '@hookform/resolvers/zod'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}

interface CycleContextTypeProps {
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  activeCycleId: string | null
  setSecondsPassed: (seconds: number) => void
  marckCycleAsFineshed: () => void
}

const newCycleFormValidatySchema = zod.object({
  task: zod.string().min(1, 'Esse campo deve conter algum caracter'),
  minutesAmount: zod
    .number()
    .min(1, 'Esse campo deve conter no minimo 5 e no maxímo 60')
    .max(60, 'Esse campo deve conter no minimo 5 e no maxímo 60 '),
})

type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidatySchema>

export const CyclesContext = createContext({} as CycleContextTypeProps)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<NewCycleFormDataProps>({
    resolver: zodResolver(newCycleFormValidatySchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: NewCycleFormDataProps) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycleActive() {
    if (activeCycle) {
      document.title = 'My Time'
    }

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId('')
  }

  function marckCycleAsFineshed() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        marckCycleAsFineshed,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

          {activeCycle ? (
            <StopCountdownButton onClick={handleStopCycleActive} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </HomeContainer>
    </CyclesContext.Provider>
  )
}
