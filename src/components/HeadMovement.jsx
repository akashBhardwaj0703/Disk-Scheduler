import { motion } from 'framer-motion'

const HeadMovement = ({ sequence, currentStep, requests }) => {
  const currentPosition = sequence[currentStep]
  const trackWidth = 800 // px
  const scale = trackWidth / 200 // px per track

  return (
    <div className="track">
      {/* Disk tracks */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        transform: 'translateY(-50%)',
        width: '100%',
        height: '2px',
        backgroundColor: '#bdc3c7'
      }}></div>
      
      {/* Track markers */}
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>0</div>
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>199</div>
      
      {/* Requests */}
      {requests.map((req, i) => (
        <motion.div
          key={`req-${i}`}
          className="request"
          initial={{ left: req * scale }}
          animate={{ left: req * scale }}
          style={{ left: req * scale }}
        />
      ))}
      
      {/* Head */}
      <motion.div
        className="head"
        initial={{ left: sequence[0] * scale }}
        animate={{ left: currentPosition * scale }}
        transition={{ type: 'spring', damping: 10 }}
      />
      
      {/* Path visualization */}
      {currentStep > 0 && (
        <svg 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            width: '100%', 
            height: '2px', 
            pointerEvents: 'none',
            transform: 'translateY(-50%)'
          }}
        >
          <path
            d={sequence.slice(0, currentStep + 1).map((pos, i) => 
              `${i === 0 ? 'M' : 'L'} ${pos * scale} 0`
            ).join(' ')}
            stroke="#3498db"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
      )}
    </div>
  )
}

export default HeadMovement