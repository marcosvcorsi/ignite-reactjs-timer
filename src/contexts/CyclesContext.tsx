import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, Cycle } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextData {
  activeCycle?: Cycle | null
  cycles: Cycle[]
  markCurrentCycleAsFinish: () => void
  amountSecondsPassed: number
  updateAmountSecondsPassed: (amountSecondsPassed: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContextData)

interface CyclesContextProviderProps {
  children: ReactNode
}

const cyclesStatesStorageKey = '@ignite-timer:cycles-state-1.0.0'

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycle: null,
    },
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(cyclesStatesStorageKey)

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson)
      }

      return initialState
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycle } = cyclesState

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(cyclesStatesStorageKey, stateJSON)
  }, [cyclesState])

  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinish() {
    dispatch(markCurrentCycleAsFinishAction())
  }

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        markCurrentCycleAsFinish,
        amountSecondsPassed,
        updateAmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
