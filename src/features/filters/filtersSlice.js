export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const inititalState = {
  status: 'all',
  colors: [],
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { color, changeType },
  }
}

export default function filtersReducer(state = inititalState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload,
      }
    }

    case 'filters/colorFilterChanged': {
      const { changeType, color } = action.payload

      let { colors } = state

      if (changeType === 'added') {
        if (colors.includes(color)) return state

        colors = [...colors, color]
      } else if (changeType === 'removed') {
        const indexToRemove = colors.findIndex(color)
        if (indexToRemove > -1) colors.splice(indexToRemove, 1)
      } else return state

      return {
        ...state,
        colors: colors,
      }
    }

    default:
      return state
  }
}
