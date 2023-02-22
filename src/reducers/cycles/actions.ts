import { Cycle } from './reducer'

export enum CycleActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISH = 'MARK_CURRENT_CYCLE_AS_FINISH',
}

export function addNewCycleAction(cycle: Cycle) {
  return {
    type: CycleActionTypes.ADD_NEW_CYCLE,
    payload: {
      data: cycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: CycleActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishAction() {
  return {
    type: CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISH,
  }
}
