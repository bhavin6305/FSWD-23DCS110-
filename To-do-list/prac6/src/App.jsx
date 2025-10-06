import { useState, useEffect } from 'react'
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [lastTranscript, setLastTranscript] = useState('')
  const [edit, setEdit] = useState(null) // Added edit functionality

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  // Enhanced voice detection with edit support
  useEffect(() => {
    if (!listening && transcript && transcript !== lastTranscript) {
      const taskText = transcript.trim()
      if (taskText) {
        if (edit !== null) {
          // Update existing task if in edit mode
          const updatedTasks = tasks.map((task, index) =>
            index === edit ? { ...task, text: taskText } : task
          )
          setTasks(updatedTasks)
          setEdit(null)
        } else {
          // Add new task
          setTasks(prev => [...prev, { text: taskText, completed: false }])
        }
        setLastTranscript(transcript)
        resetTranscript()
        setInput('') // Clear input after voice command
      }
    }
  }, [listening, transcript, resetTranscript, lastTranscript, edit, tasks])

  // Enhanced add/update function
  const handleAddTask = () => {
    if (input.trim() === '') return
    
    if (edit !== null) {
      // Update existing task
      const updatedTasks = tasks.map((task, index) =>
        index === edit ? { ...task, text: input.trim() } : task
      )
      setTasks(updatedTasks)
      setEdit(null)
    } else {
      // Add new task
      setTasks([...tasks, { text: input.trim(), completed: false }])
    }
    setInput('')
  }

  // New edit function
  const handleEditTask = (index) => {
    setInput(tasks[index].text)
    setEdit(index)
  }

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
    // Clear edit mode if deleting the task being edited
    if (edit === index) {
      setInput('')
      setEdit(null)
    }
  }

  const handleToggleCompleted = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(newTasks)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const pendingTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="App">
        <div className="error-message">
          Your browser doesn't support speech recognition.
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Get Things Done!</h1>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              placeholder="What is the Task today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask()
                }
              }}
              className="task-input"
            />
            <button 
              onClick={handleAddTask}
              className={`add-btn ${edit !== null ? 'update-mode' : ''}`}
            >
              {edit !== null ? "Update Task" : "Add Task"}
            </button>
          </div>

          {/* Voice Control Buttons */}
          <div className="voice-controls">
            <button 
              onClick={() => SpeechRecognition.startListening({ continuous: false })}
              className={`voice-btn ${listening ? 'listening' : ''}`}
              disabled={listening}
            >
              {listening ? "🎤 Listening..." : "🎤 Speak Task"}
            </button>
            
            {listening && (
              <button 
                onClick={SpeechRecognition.stopListening}
                className="stop-btn"
              >
                🛑 Stop
              </button>
            )}
          </div>

          {/* Voice Feedback */}
          {transcript && (
            <div className="voice-feedback">
              <p><strong>Voice input:</strong> "{transcript}"</p>
            </div>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingTasks.length})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No {filter === 'all' ? '' : filter} tasks yet.</p>
              <p className="empty-subtitle">
                {filter === 'all' 
                  ? 'Add a task by typing or using voice command!' 
                  : "Switch to \"All\" to see your tasks."}
              </p>
            </div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task, index) => {
                const originalIndex = tasks.findIndex(t => t === task)
                return (
                  <li 
                    key={originalIndex} 
                    className={`task-item ${task.completed ? 'completed' : ''} ${edit === originalIndex ? 'editing' : ''}`}
                  >
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleCompleted(originalIndex)}
                        className="task-checkbox"
                      />
                      <span className="task-text">{task.text}</span>
                    </div>
                    
                    <div className="task-actions">
                      <button 
                        onClick={() => handleEditTask(originalIndex)}
                        className="edit-btn"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleRemoveTask(originalIndex)}
                        className="delete-btn"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
