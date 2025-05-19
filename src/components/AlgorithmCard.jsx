const AlgorithmCard = ({ title, description }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    }}>
      <h3 style={{ 
        color: '#2c3e50',
        marginBottom: '1rem',
        fontSize: '1.3rem'
      }}>{title}</h3>
      <div style={{ 
        color: '#7f8c8d',
        lineHeight: '1.6'
      }}>
        {description}
      </div>
    </div>
  )
}

export default AlgorithmCard