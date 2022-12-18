import { createContext, ReactNode, useState, useReducer } from 'react'

interface CreateNewCycleProps {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payLoad.newCycle]
    }

    if (action.type === 'MARCK_CYCLE_AS_FINESHED') {
      return [...state, action.payLoad.activeCycleId]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function marckCycleAsFineshed() {
    dispatch({
      type: 'MARCK_CYCLE_AS_FINESHED',
      payLoad: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateNewCycleProps) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payLoad: {
        newCycle,
      },
    })

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    if (activeCycle) {
      document.title = 'My Time'
    }

    dispatch({
      type: ' INTERRUPT_CURRENT_CYCLE',
      payLoad: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interrupedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId('')
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
