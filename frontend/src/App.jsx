import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PenLine, Send, SendHorizonal } from 'lucide-react'

// Sample projects for the left sidebar
const initialProjects = ['Project #1', 'Project #2', 'Project #3', 'Project #4']

// Canvas demo nodes styled to match the mock
const nodeStyle = {
  width: 360,
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#242424',
  color: '#ffffff',
  border: '1px solid #2C2C2C',
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.35) inset, 0 4px 12px rgba(0,0,0,0.25)',
  fontWeight: 600,
}

const initialNodes = [
  { id: 'n1', position: { x: 120, y: 60 }, data: { label: ' ' }, style: nodeStyle },
  { id: 'n2', position: { x: 820, y: 60 }, data: { label: ' ' }, style: nodeStyle },
  { id: 'n3', position: { x: 380, y: 420 }, data: { label: ' ' }, style: nodeStyle },
  { id: 'n4', position: { x: 980, y: 420 }, data: { label: ' ' }, style: nodeStyle },
]

const edgeStyle = { stroke: '#ffffff', strokeWidth: 2 }
const marker = { type: MarkerType.ArrowClosed, color: '#ffffff' }
const initialEdges = [
  { id: 'e1-2', source: 'n1', target: 'n2', style: edgeStyle, markerEnd: marker },
  { id: 'e1-3', source: 'n1', target: 'n3', style: edgeStyle, markerEnd: marker },
  { id: 'e2-4', source: 'n2', target: 'n4', style: edgeStyle, markerEnd: marker },
  { id: 'e3-4', source: 'n3', target: 'n4', style: edgeStyle, markerEnd: marker },
]

export default function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [projects, setProjects] = useState(initialProjects)
  const [activeProject, setActiveProject] = useState(1)
  const [message, setMessage] = useState('')

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge({ ...params, markerEnd: marker, style: edgeStyle }, edgesSnapshot)),
    [],
  )

  const addProject = () => {
    const nextIndex = projects.length + 1
    setProjects((p) => [...p, `Project #${nextIndex}`])
    setActiveProject(projects.length) // select the newly added
  }

  const onSend = () => {
    // placeholder action for the bottom input bar
    if (!message.trim()) return
    alert(`Prompt sent to ${projects[activeProject]}:\n\n${message}`)
    setMessage('')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Ramus AI</div>
        <button className="new-project-btn" onClick={addProject}>
          <PenLine size={18} />
          <span>New Project</span>
        </button>

        <div className="projects-label">Projects</div>
        <ul className="projects-list">
          {[...projects].reverse().map((name, idx) => {
            const originalIdx = projects.length - 1 - idx
            return (
              <li
                key={name}
                className={`project-item ${originalIdx === activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(originalIdx)}
              >
                {name}
              </li>
            )
          })}
        </ul>
      </aside>

      <main className="content">
        <div className="canvas-area">
          <div className="flow-container">
            <ReactFlow
              proOptions={{ hideAttribution: true }}
              colorMode="dark"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background
                id="dots"
                color="#2C2C2C"
                gap={28}
                size={1.8}
              />
            </ReactFlow>
          </div>
        </div>

        <div className="input-bar">
          <div className="input-shell">
            <input
              placeholder="Type your prompt…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSend()
              }}
            />
            <button className="send-btn" onClick={onSend} aria-label="Send">
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}