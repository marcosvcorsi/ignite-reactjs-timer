import { produce } from 'immer'
import { CycleActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycle?: Cycle | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case CycleActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.data],
      //   activeCycle: action.payload.data,
      // }

      return produce(state, (draft) => {
        const newCycle = action.payload.data

        draft.cycles.push(newCycle)
        draft.activeCycle = newCycle
      })
    case CycleActionTypes.INTERRUPT_CURRENT_CYCLE:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycle?.id) {
      //       return {
      //         ...cycle,
      //         interruptedDate: new Date(),
      //       }
      //     }
      //     return cycle
      //   }),
      //   activeCycle: null,
      // }

      return produce(state, (draft) => {
        const currentCycleIndex = draft.cycles.findIndex(
          (cycle) => cycle.id === draft.activeCycle?.id,
        )

        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycle = null
      })
    case CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISH:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycle?.id) {
      //       return {
      //         ...cycle,
      //         finishedDate: new Date(),
      //       }
      //     }

      //     return cycle
      //   }),
      //   activeCycle: null,
      // }
      return produce(state, (draft) => {
        const currentCycleIndex = draft.cycles.findIndex(
          (cycle) => cycle.id === draft.activeCycle?.id,
        )

        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycle = null
      })
    default:
      return state
  }
}
