import { availableColors, capitalize } from '../filters/colors'
import { StatusFilters, colorFilterChanged } from '../filters/filtersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredTodos } from '../todos/todosSlice'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFiltesrs">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span className="color-block" style={{ backroundColor: color }}></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const dispatch = useDispatch()

  const filteredTodos = Object.values(useSelector(selectFilteredTodos))
  // console.log('filteredTodos', filteredTodos)

  const todosRemainingNum = filteredTodos.length

  // console.log('todosRemainingNum', todosRemainingNum)

  const { status, colors } = useSelector((state) => state.filters)

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType))

  const handleAllCompletedClick = () =>
    filteredTodos.forEach((todo) =>
      dispatch({ type: 'todos/todoToggled', payload: todo.id })
    )

  const handleCleraCompletedClick = () =>
    filteredTodos
      .filter((todo) => todo.completed)
      .forEach((todo) =>
        dispatch({ type: 'todo/todoDeleted', payload: { id: todo.id } })
      )

  const onStatusChange = (status) =>
    dispatch({ type: 'filters/statusFilterChanged', payload: status })

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={handleAllCompletedClick}>
          Mark All Completed
        </button>
        <button className="button" onClick={handleCleraCompletedClick}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemainingNum} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
