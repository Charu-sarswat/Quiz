
import './App.css'
import Quiz from './components/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <div className="App">
        <Quiz />
      </div>
      
  )
}

export default App
