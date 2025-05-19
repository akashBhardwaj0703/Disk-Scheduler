import { useState } from 'react'
import { motion } from 'framer-motion'
import HeadMovement from '../components/HeadMovement'

const Visualize = () => {
  const [algorithm, setAlgorithm] = useState('FCFS')
  const [headPosition, setHeadPosition] = useState(50)
  const [requests, setRequests] = useState('')
  const [direction, setDirection] = useState('right')
  const [isVisualizing, setIsVisualizing] = useState(false)
  const [sequence, setSequence] = useState([])
  const [totalSeek, setTotalSeek] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const algorithms = [
    { id: 'FCFS', name: 'FCFS' },
    { id: 'SSTF', name: 'SSTF' },
    { id: 'SCAN', name: 'SCAN' },
    { id: 'LOOK', name: 'LOOK' },
    { id: 'C-SCAN', name: 'C-SCAN' },
    { id: 'C-LOOK', name: 'C-LOOK' }
  ]

  const calculateSequence = () => {
    let reqs = requests.split(',')
      .map(s => s.trim())
      .map(Number)
      .filter(n => !isNaN(n) && n >= 0 && n <= 199)
    if (reqs.length === 0) return

    let seq = []
    let total = 0
    let current = headPosition

    switch (algorithm) {
      case 'FCFS':
        seq = [...reqs]
        for (let i = 0; i < seq.length; i++) {
          total += Math.abs(seq[i] - current)
          current = seq[i]
        }
        break
      
      case 'SSTF':
        seq = []
        let tempReqsSSTF = [...reqs]
        current = headPosition
        
        while (tempReqsSSTF.length > 0) {
          let closest = tempReqsSSTF.reduce((prev, curr) => 
            Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
          )
          total += Math.abs(closest - current)
          seq.push(closest)
          current = closest
          tempReqsSSTF = tempReqsSSTF.filter(r => r !== closest)
        }
        break
      
      case 'SCAN':
        seq = []
        let tempReqsSCAN = [...reqs]
        current = headPosition
        let dirSCAN = direction === 'right' ? 1 : -1
        
        tempReqsSCAN.sort((a, b) => a - b)
        let leftSCAN = tempReqsSCAN.filter(r => r <= current).sort((a, b) => b - a)
        let rightSCAN = tempReqsSCAN.filter(r => r > current).sort((a, b) => a - b)
        
        if (dirSCAN === 1) {
          seq = [...rightSCAN]
          if (rightSCAN.length > 0) total += Math.abs(rightSCAN[rightSCAN.length-1] - current)
          
          if (rightSCAN.length > 0) {
            seq.push(199)
            total += 199 - rightSCAN[rightSCAN.length-1]
          }
          
          seq = [...seq, ...leftSCAN]
          if (leftSCAN.length > 0) total += 199 - leftSCAN[0]
        } else {
          seq = [...leftSCAN]
          if (leftSCAN.length > 0) total += Math.abs(leftSCAN[leftSCAN.length-1] - current)
          
          if (leftSCAN.length > 0) {
            seq.push(0)
            total += leftSCAN[0]
          }
          
          seq = [...seq, ...rightSCAN]
          if (rightSCAN.length > 0) total += rightSCAN[rightSCAN.length-1]
        }
        break
      
      case 'LOOK':
        seq = []
        let tempReqsLOOK = [...reqs]
        current = headPosition
        let dirLOOK = direction === 'right' ? 1 : -1
        
        tempReqsLOOK.sort((a, b) => a - b)
        let leftLOOK = tempReqsLOOK.filter(r => r <= current).sort((a, b) => b - a)
        let rightLOOK = tempReqsLOOK.filter(r => r > current).sort((a, b) => a - b)
        
        if (dirLOOK === 1) {
          seq = [...rightLOOK]
          if (rightLOOK.length > 0) total += Math.abs(rightLOOK[rightLOOK.length-1] - current)
          
          seq = [...seq, ...leftLOOK]
          if (leftLOOK.length > 0 && rightLOOK.length > 0)
            total += rightLOOK[rightLOOK.length-1] - leftLOOK[0]
        } else {
          seq = [...leftLOOK]
          if (leftLOOK.length > 0) total += Math.abs(leftLOOK[leftLOOK.length-1] - current)
          
          seq = [...seq, ...rightLOOK]
          if (rightLOOK.length > 0 && leftLOOK.length > 0)
            total += rightLOOK[rightLOOK.length-1] - leftLOOK[0]
        }
        break
      
      case 'C-SCAN':
        seq = []
        let tempReqsCSCAN = [...reqs]
        current = headPosition
        let dirCSCAN = direction === 'right' ? 1 : -1
        
        tempReqsCSCAN.sort((a, b) => a - b)
        let leftCSCAN = tempReqsCSCAN.filter(r => r <= current).sort((a, b) => a - b)
        let rightCSCAN = tempReqsCSCAN.filter(r => r > current).sort((a, b) => a - b)
        
        if (dirCSCAN === 1) {
          seq = [...rightCSCAN]
          if (rightCSCAN.length > 0) total += Math.abs(rightCSCAN[rightCSCAN.length-1] - current)
          
          if (rightCSCAN.length > 0) {
            total += 199 - rightCSCAN[rightCSCAN.length-1]
            if (leftCSCAN.length > 0) total += leftCSCAN[leftCSCAN.length-1]
          }
          seq = [...seq, ...leftCSCAN]
        } else {
          seq = [...leftCSCAN]
          if (leftCSCAN.length > 0) total += Math.abs(leftCSCAN[0] - current)
          
          if (leftCSCAN.length > 0) {
            total += leftCSCAN[0]
            if (rightCSCAN.length > 0) total += 199 - rightCSCAN[0]
          }
          seq = [...rightCSCAN, ...seq]
        }
        break
      
      case 'C-LOOK':
        seq = []
        let tempReqsCLOOK = [...reqs]
        current = headPosition
        let dirCLOOK = direction === 'right' ? 1 : -1
        
        tempReqsCLOOK.sort((a, b) => a - b)
        let leftCLOOK = tempReqsCLOOK.filter(r => r <= current).sort((a, b) => a - b)
        let rightCLOOK = tempReqsCLOOK.filter(r => r > current).sort((a, b) => a - b)
        
        if (dirCLOOK === 1) {
          seq = [...rightCLOOK]
          if (rightCLOOK.length > 0) total += Math.abs(rightCLOOK[rightCLOOK.length-1] - current)
          
          if (rightCLOOK.length > 0 && leftCLOOK.length > 0) {
            total += rightCLOOK[rightCLOOK.length-1] - leftCLOOK[0]
          }
          seq = [...seq, ...leftCLOOK]
        } else {
          seq = [...leftCLOOK]
          if (leftCLOOK.length > 0) total += Math.abs(leftCLOOK[0] - current)
          
          if (leftCLOOK.length > 0 && rightCLOOK.length > 0) {
            total += rightCLOOK[rightCLOOK.length-1] - leftCLOOK[0]
          }
          seq = [...rightCLOOK, ...seq]
        }
        break
    }

    setSequence([headPosition, ...seq])
    setTotalSeek(total)
    setIsVisualizing(true)
    setCurrentStep(0)
  }

  // Add these handlers to navigate the visualization steps
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

  return (
    <div className="container">
      <div className="visualize-container">
        <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Disk Scheduling Visualization</h2>
        
        {!isVisualizing ? (
          <>
            <div className="input-group">
              <label>Select Algorithm</label>
              <div className="algorithm-selector">
                {algorithms.map(algo => (
                  <button
                    key={algo.id}
                    className={`algorithm-btn ${algorithm === algo.id ? 'active' : ''}`}
                    onClick={() => setAlgorithm(algo.id)}
                  >
                    {algo.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Current Head Position (0-199)</label>
              <input 
                type="number" 
                min="0" 
                max="199" 
                value={headPosition}
                onChange={(e) => setHeadPosition(parseInt(e.target.value) || 0)}
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

            {(algorithm === 'SCAN' || algorithm === 'LOOK' || algorithm === 'C-SCAN' || algorithm === 'C-LOOK') && (
              <div className="input-group">
                <label>Initial Direction</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="radio" 
                      name="direction" 
                      checked={direction === 'right'}
                      onChange={() => setDirection('right')}
                    />
                    Right (toward higher tracks)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="radio" 
                      name="direction" 
                      checked={direction === 'left'}
                      onChange={() => setDirection('left')}
                    />
                    Left (toward lower tracks)
                  </label>
                </div>
              </div>
            )}

            <button 
              className="btn btn-primary" 
              onClick={calculateSequence}
              style={{ marginTop: '1rem' }}
            >
              Visualize
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <h3>{algorithm} Algorithm</h3>
              <p>Sequence: {sequence.join(' → ')}</p>
            </div>

            <HeadMovement 
              sequence={sequence} 
              currentStep={currentStep} 
              requests={requests.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))}
            />

            <div className="stats">
              <p>Total Seek Time: {totalSeek} tracks</p>
              <p>Current Position: {sequence[currentStep]}</p>
              {currentStep > 0 && (
                <p>Last Movement: {Math.abs(sequence[currentStep] - sequence[currentStep-1])} tracks</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                className="btn" 
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button 
                className="btn" 
                onClick={handleNext}
                disabled={currentStep === sequence.length - 1}
              >
                Next
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .visualize-container {
          background: #f5f6fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 10px #dcdde1;
        }
        .input-group {
          margin-bottom: 1rem;
        }
        .algorithm-selector {
          display: flex;
          gap: 0.5rem;
        }
        .algorithm-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background: #dcdde1;
          color: #2f3640;
          transition: background 0.3s;
        }
        .algorithm-btn.active {
          background: #273c75;
          color: white;
        }
        input[type="number"], input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background: #718093;
          color: white;
          transition: background 0.3s;
        }
        .btn-primary {
          background: #273c75;
        }
        .btn-danger {
          background: #e84118;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .stats p {
          margin: 0.25rem 0;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default Visualize
