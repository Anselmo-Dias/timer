import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateNewCycleProps {
  task: string
  minutesAmount: number
}

interface CycleContextTypeProps {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  activeCycleId: string | null
  marckCycleAsFineshed: () => void
  setSecondsPassed: (seconds: number) => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: CreateNewCycleProps) => void
}

export const CyclesContext = createContext({} as CycleContextTypeProps)

interface CyclesContextChildrenProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextChildrenProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@my-timer:cyclesState-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@my-timer:cyclesState-1.0.0', stateJSON)
  }, [cyclesState])

  // aqui

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function marckCycleAsFineshed() {
    dispatch(markCurrentCyclesAsFinishedAction())
  }

  function createNewCycle(data: CreateNewCycleProps) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    // setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    if (activeCycle) {
      document.title = 'My Time'
    }

    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        marckCycleAsFineshed,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
