import { ref, toRef } from 'vue'

interface State {
  isOpen: boolean
  event: Event | undefined
}

export const useToggleComponent = (defaultValue: boolean = false) => {
  const state = ref<State>({
    isOpen: defaultValue,
    event: undefined,
  })

  const toggling = (ev: Event | undefined = undefined) => {
    state.value.isOpen = !state.value.isOpen
    state.value.event = ev
  }

  return {
    toggling,
    isOpen: toRef(state.value, 'isOpen'),
    isVisited: toRef(state.value, 'isOpen'),
    isFilled: toRef(state.value, 'isOpen'),
    isShow: toRef(state.value, 'isOpen'),
    isActive: toRef(state.value, 'isOpen'),
    event: toRef(state.value, 'event'),
  }
}
