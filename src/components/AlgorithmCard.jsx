import { motion } from 'framer-motion'

const AlgorithmCard = ({ title, description, icon, color = "#4361ee" }) => {
  return (
    <motion.div 
      className="algorithm-card"
      whileHover={{ 
        y: -5,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        border: `2px solid transparent`,
        backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${color}20, ${color}40)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="card-header">
        <div className="icon-container" style={{ backgroundColor: `${color}20` }}>
          <span className="icon" style={{ color: color }}>{icon}</span>
        </div>
        <h3 style={{ 
          color: '#2c3e50',
          marginBottom: '1rem',
          fontSize: '1.4rem',
          fontWeight: '600'
        }}>{title}</h3>
      </div>
      
      <div className="card-content" style={{ 
        color: '#7f8c8d',
        lineHeight: '1.7',
        fontSize: '0.95rem'
      }}>
        {description}
      </div>

      <div className="card-footer">
        <div className="color-accent" style={{ backgroundColor: color }}></div>
      </div>

      <style jsx>{`
        .algorithm-card {
          position: relative;
          cursor: pointer;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .icon-container {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon {
          font-size: 1.5rem;
        }

        .card-content p {
          margin-bottom: 0.8rem;
        }

        .card-content p:last-child {
          margin-bottom: 0;
        }

        .card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .color-accent {
          height: 100%;
          width: 0;
          transition: width 0.3s ease;
        }

        .algorithm-card:hover .color-accent {
          width: 100%;
        }
      `}</style>
    </motion.div>
  )
}

export default AlgorithmCard
