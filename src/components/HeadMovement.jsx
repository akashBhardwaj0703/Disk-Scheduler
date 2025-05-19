const HeadMovement = ({ sequence, currentStep, requests }) => {
  const currentPosition = sequence[currentStep];
  const trackWidth = 800; // px
  const scale = trackWidth / 200; // px per track

  // Filter and parse requests
  const parsedRequests = requests
    .filter(n => !isNaN(n) && n >= 0 && n <= 199);

  return (
    <div className="track">
      {/* Disk track line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '2px',
        backgroundColor: '#bdc3c7',
        transform: 'translateY(-50%)'
      }}></div>
      
      {/* Track markers */}
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>0</div>
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>199</div>
      
      {/* Request markers */}
      {parsedRequests.map((req, i) => (
        <div
          key={`req-${i}`}
          className="request"
          style={{ 
            left: `${req * scale}px`,
            backgroundColor: sequence.includes(req) ? '#3498db' : '#95a5a6'
          }}
        />
      ))}
      
      {/* Disk head */}
      <div
        className="head"
        style={{ 
          left: `${currentPosition * scale}px`,
          transition: 'left 0.5s ease-out'
        }}
      />
      
      {/* Movement path */}
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
  );
};

export default HeadMovement;