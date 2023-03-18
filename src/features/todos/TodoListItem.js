import { useDispatch, useSelector } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { selectTodoById } from './todosSlice'

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: id })
  }

  const handleColorChanged = (e) => {
    dispatch({
      type: 'todos/colorSelected',
      payload: { color: e.target.value, todoId: id },
    })
  }

  const onDelete = () => {
    dispatch({ type: 'todo/todoDeleted', payload: { id } })
  }

  const colorOptions = availableColors.map((c, i) => (
    <option key={i} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
            className="colorPicker"
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
