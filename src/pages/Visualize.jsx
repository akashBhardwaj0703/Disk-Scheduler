import { useState } from 'react'
import { motion } from 'framer-motion'
import HeadMovement from '../components/HeadMovement'
import HeadMovement2D from '../components/HeadMovement2D'

const Visualize = () => {
  const [algorithm, setAlgorithm] = useState('FCFS')
  const [headPosition, setHeadPosition] = useState(50)
  const [requests, setRequests] = useState('')
  const [direction, setDirection] = useState('right')
  const [isVisualizing, setIsVisualizing] = useState(false)
  const [sequence, setSequence] = useState([])
  const [totalSeek, setTotalSeek] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [visualizationMode, setVisualizationMode] = useState('2D') // '1D' or '2D'

  const algorithms = [
    { id: 'FCFS', name: 'FCFS', description: 'First Come First Serve' },
    { id: 'SSTF', name: 'SSTF', description: 'Shortest Seek Time First' },
    { id: 'SCAN', name: 'SCAN', description: 'Elevator Algorithm' },
    { id: 'LOOK', name: 'LOOK', description: 'LOOK Algorithm' },
    { id: 'C-SCAN', name: 'C-SCAN', description: 'Circular SCAN' },
    { id: 'C-LOOK', name: 'C-LOOK', description: 'Circular LOOK' }
  ]

  const calculateSequence = () => {
    let reqs = requests.split(',')
      .map(s => s.trim())
      .map(Number)
      .filter(n => !isNaN(n) && n >= 0 && n <= 199)
    if (reqs.length === 0) return

    let seq = []
    let current = headPosition
    let fullSequence = [headPosition]

    switch (algorithm) {
      case 'FCFS':
        seq = [...reqs]
        break
      case 'SSTF': {
        let tempReqs = [...reqs]
        while (tempReqs.length > 0) {
          let closest = tempReqs.reduce((prev, curr) =>
            Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
          )
          seq.push(closest)
          current = closest
          tempReqs = tempReqs.filter(r => r !== closest)
        }
        break
      }
      case 'SCAN': {
        let tempReqs = [...reqs].sort((a, b) => a - b)
        let dir = direction === 'right' ? 1 : -1
        let left = tempReqs.filter(r => r < current).sort((a, b) => b - a)
        let right = tempReqs.filter(r => r >= current).sort((a, b) => a - b)
        if (dir === 1) {
          seq = [...right]
          if (seq.length && seq[seq.length - 1] !== 199) seq.push(199)
          seq = [...seq, ...left]
        } else {
          seq = [...left]
          if (seq.length && seq[seq.length - 1] !== 0) seq.push(0)
          seq = [...seq, ...right]
        }
        break
      }
      case 'LOOK': {
        let tempReqs = [...reqs].sort((a, b) => a - b)
        let dir = direction === 'right' ? 1 : -1
        let left = tempReqs.filter(r => r < current).sort((a, b) => b - a)
        let right = tempReqs.filter(r => r >= current).sort((a, b) => a - b)
        if (dir === 1) {
          seq = [...right, ...left]
        } else {
          seq = [...left, ...right]
        }
        break
      }
      case 'C-SCAN': {
        let tempReqs = [...reqs].sort((a, b) => a - b)
        let dir = direction === 'right' ? 1 : -1
        let left = tempReqs.filter(r => r < current).sort((a, b) => a - b)
        let right = tempReqs.filter(r => r >= current).sort((a, b) => a - b)
        if (dir === 1) {
          seq = [...right]
          if (seq.length && seq[seq.length - 1] !== 199) seq.push(199)
          if (left.length) seq.push(0)
          seq = [...seq, ...left]
        } else {
          seq = [...left.reverse()]
          if (seq.length && seq[seq.length - 1] !== 0) seq.push(0)
          if (right.length) seq.push(199)
          seq = [...seq, ...right.reverse()]
        }
        break
      }
      case 'C-LOOK': {
        let tempReqs = [...reqs].sort((a, b) => a - b)
        let dir = direction === 'right' ? 1 : -1
        let left = tempReqs.filter(r => r < current).sort((a, b) => a - b)
        let right = tempReqs.filter(r => r >= current).sort((a, b) => a - b)
        if (dir === 1) {
          seq = [...right]
          if (left.length) seq.push(left[0])
          seq = [...seq, ...left.slice(1)]
        } else {
          seq = [...left.reverse()]
          if (right.length) seq.push(right[right.length - 1])
          seq = [...seq, ...right.slice(0, -1).reverse()]
        }
        break
      }
    }

    fullSequence = [headPosition, ...seq]
    let total = 0
    for (let i = 1; i < fullSequence.length; i++) {
      total += Math.abs(fullSequence[i] - fullSequence[i - 1])
    }
    setSequence(fullSequence)
    setTotalSeek(total)
    setIsVisualizing(true)
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < sequence.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setIsVisualizing(false)
    setSequence([])
    setTotalSeek(0)
    setCurrentStep(0)
  }

  const handleAutoPlay = () => {
    if (currentStep < sequence.length - 1) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= sequence.length - 1) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  return (
    <div className="visualize-page">
      <motion.div 
        className="visualize-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-header">
          <h1>Disk Scheduling Visualization</h1>
          <p>Interactive 2D visualization of disk head movement algorithms</p>
        </div>
        
        {!isVisualizing ? (
          <motion.div 
            className="setup-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="input-section">
              <div className="input-group">
                <label>Select Algorithm</label>
                <div className="algorithm-selector">
                  {algorithms.map(algo => (
                    <button
                      key={algo.id}
                      className={`algorithm-btn ${algorithm === algo.id ? 'active' : ''}`}
                      onClick={() => setAlgorithm(algo.id)}
                    >
                      <span className="algo-name">{algo.name}</span>
                      <span className="algo-desc">{algo.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Current Head Position (0-199)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="199" 
                    value={headPosition}
                    onChange={(e) => setHeadPosition(parseInt(e.target.value) || 0)}
                    placeholder="50"
                  />
                </div>

                <div className="input-group">
                  <label>Requests (comma separated, 0-199)</label>
                  <input 
                    type="text" 
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="e.g. 98, 183, 37, 122"
                  />
                </div>
              </div>

              {(algorithm === 'SCAN' || algorithm === 'LOOK' || algorithm === 'C-SCAN' || algorithm === 'C-LOOK') && (
                <div className="input-group">
                  <label>Initial Direction</label>
                  <div className="direction-selector">
                    <label className="direction-option">
                      <input 
                        type="radio" 
                        name="direction" 
                        checked={direction === 'right'}
                        onChange={() => setDirection('right')}
                      />
                      <span className="radio-custom"></span>
                      <span className="direction-text">
                        <span className="direction-icon">→</span>
                        Right (toward higher tracks)
                      </span>
                    </label>
                    <label className="direction-option">
                      <input 
                        type="radio" 
                        name="direction" 
                        checked={direction === 'left'}
                        onChange={() => setDirection('left')}
                      />
                      <span className="radio-custom"></span>
                      <span className="direction-text">
                        <span className="direction-icon">←</span>
                        Left (toward lower tracks)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <button 
                className="btn btn-primary visualize-btn" 
                onClick={calculateSequence}
              >
                <span>Start Visualization</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="visualization-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="visualization-header">
              <div className="algorithm-info">
                <h2>{algorithm} Algorithm</h2>
                <p>Sequence: {sequence.join(' → ')}</p>
              </div>
              
              <div className="visualization-toggle">
                <label>Visualization Mode:</label>
                <div className="toggle-buttons">
                  <button 
                    className={`toggle-btn ${visualizationMode === '1D' ? 'active' : ''}`}
                    onClick={() => setVisualizationMode('1D')}
                  >
                    1D Track
                  </button>
                  <button 
                    className={`toggle-btn ${visualizationMode === '2D' ? 'active' : ''}`}
                    onClick={() => setVisualizationMode('2D')}
                  >
                    2D Chart
                  </button>
                </div>
              </div>
            </div>

            <div className="visualization-content">
              {visualizationMode === '1D' ? (
                <HeadMovement 
                  sequence={sequence} 
                  currentStep={currentStep} 
                  requests={requests.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))}
                />
              ) : (
                <HeadMovement2D 
                  sequence={sequence} 
                  currentStep={currentStep} 
                  requests={requests.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))}
                  algorithm={algorithm}
                />
              )}
            </div>

            <div className="stats-panel">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Total Seek Time</span>
                  <span className="stat-value">{totalSeek} tracks</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Current Position</span>
                  <span className="stat-value">{sequence[currentStep]}</span>
                </div>
                {currentStep > 0 && (
                  <div className="stat-card">
                    <span className="stat-label">Last Movement</span>
                    <span className="stat-value">{Math.abs(sequence[currentStep] - sequence[currentStep-1])} tracks</span>
                  </div>
                )}
                <div className="stat-card">
                  <span className="stat-label">Progress</span>
                  <span className="stat-value">{currentStep + 1} / {sequence.length}</span>
                </div>
              </div>
            </div>

            <div className="controls-panel">
              <div className="control-buttons">
                <button 
                  className="btn btn-secondary" 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  Previous
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleAutoPlay}
                  disabled={currentStep === sequence.length - 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Auto Play
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleNext}
                  disabled={currentStep === sequence.length - 1}
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              <button 
                className="btn btn-danger" 
                onClick={handleReset}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style jsx>{`
        .visualize-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 0;
        }

        .visualize-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .page-header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .setup-section {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .input-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .algorithm-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .algorithm-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .algorithm-btn.active {
          border-color: #4361ee;
          background: #4361ee;
          color: white;
        }

        .algo-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .algo-desc {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .direction-selector {
          display: flex;
          gap: 1rem;
        }

        .direction-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .direction-option input[type="radio"] {
          display: none;
        }

        .radio-custom {
          width: 16px;
          height: 16px;
          border: 2px solid #ddd;
          border-radius: 50%;
          position: relative;
        }

        .direction-option input[type="radio"]:checked + .radio-custom {
          border-color: #4361ee;
        }

        .direction-option input[type="radio"]:checked + .radio-custom::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #4361ee;
          border-radius: 50%;
        }

        .direction-option input[type="radio"]:checked ~ .direction-text {
          color: #4361ee;
          font-weight: 600;
        }

        .direction-icon {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        input[type="number"], input[type="text"] {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input[type="number"]:focus, input[type="text"]:focus {
          outline: none;
          border-color: #4361ee;
        }

        .visualize-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .visualization-section {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .visualization-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f8f9fa;
        }

        .algorithm-info h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .algorithm-info p {
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        .visualization-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toggle-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .toggle-btn.active {
          background: #4361ee;
          color: white;
          border-color: #4361ee;
        }

        .visualization-content {
          margin: 2rem 0;
        }

        .stats-panel {
          margin: 2rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-card {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #4361ee;
        }

        .controls-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 2px solid #f8f9fa;
        }

        .control-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary {
          background: #4361ee;
          color: white;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .visualize-container {
            padding: 0 1rem;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .input-row {
            grid-template-columns: 1fr;
          }

          .algorithm-selector {
            grid-template-columns: 1fr;
          }

          .visualization-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .controls-panel {
            flex-direction: column;
            gap: 1rem;
          }

          .control-buttons {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default Visualize