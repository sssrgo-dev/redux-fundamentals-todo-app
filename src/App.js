import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Look what an application Sssrgo have made</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos simple application</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
