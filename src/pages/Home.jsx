import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AlgorithmCard from '../components/AlgorithmCard'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-section" variants={itemVariants}>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Disk Scheduling</span>
            <br />
            <span className="subtitle">Algorithm Visualizer</span>
          </h1>
          <p className="hero-description">
            Explore and understand how operating systems manage disk I/O requests through interactive visualizations of various scheduling algorithms.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Algorithms</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2D</span>
              <span className="stat-label">Visualization</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Interactive</span>
              <span className="stat-label">Experience</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="disk-animation">
            <div className="disk-circle">
              <div className="disk-head"></div>
              <div className="track-line"></div>
              <div className="request-points">
                {[20, 60, 120, 180].map((pos, i) => (
                  <div 
                    key={i}
                    className="request-point"
                    style={{ left: `${pos}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="algorithms-section" variants={itemVariants}>
        <h2 className="section-title">Available Algorithms</h2>
        <p className="section-subtitle">Learn about different disk scheduling strategies and their characteristics</p>
        
        <div className="algorithm-grid">
          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="FCFS (First Come First Serve)" 
              description={
                <>
                  <p>FCFS is the simplest disk scheduling algorithm. It services requests in the order they arrive in the disk queue without any reordering.</p>
                  <p>The main advantage of FCFS is its simplicity and fairness, as every request gets serviced in the order it was received.</p>
                  <p>However, FCFS can result in poor performance because it doesn't optimize seek time. The total head movement can be quite large compared to other algorithms.</p>
                </>
              }
              icon="📋"
              color="#4361ee"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="SSTF (Shortest Seek Time First)" 
              description={
                <>
                  <p>SSTF selects the request with the minimum seek time from the current head position. This approach minimizes the total seek time compared to FCFS.</p>
                  <p>After servicing each request, SSTF selects the nearest pending request from the current head position. This is similar to the shortest-job-first (SJF) scheduling algorithm.</p>
                  <p>SSTF provides better performance than FCFS in terms of average response time and total head movement. However, it may cause starvation of some requests.</p>
                </>
              }
              icon="🎯"
              color="#f72585"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="SCAN (Elevator Algorithm)" 
              description={
                <>
                  <p>The SCAN algorithm moves the disk arm back and forth across the disk, servicing requests as it reaches them. This is similar to how an elevator works.</p>
                  <p>In SCAN, the head starts at one end of the disk and moves toward the other end, servicing requests as it goes. When it reaches the other end, it reverses direction.</p>
                  <p>SCAN provides a more uniform wait time compared to SSTF and prevents starvation. However, requests at the edges of the disk may have to wait longer.</p>
                </>
              }
              icon="🔄"
              color="#3f37c9"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="LOOK Algorithm" 
              description={
                <>
                  <p>LOOK is a variant of SCAN where the disk arm only goes as far as the last request in each direction instead of going all the way to the end of the disk.</p>
                  <p>This improves upon SCAN by not wasting time moving to the physical end of the disk if there are no requests there. The head reverses direction immediately after servicing the last request.</p>
                  <p>LOOK has the same advantages as SCAN in terms of preventing starvation and providing uniform service, while reducing unnecessary head movement.</p>
                </>
              }
              icon="👀"
              color="#7209b7"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="C-SCAN (Circular SCAN)" 
              description={
                <>
                  <p>C-SCAN treats the disk as circular. When the head reaches one end, it immediately returns to the beginning without servicing requests on the return trip.</p>
                  <p>This variant of SCAN provides more uniform wait times than SCAN, especially for requests near the edges of the disk. It eliminates the "elevator effect" where requests at one end wait longer.</p>
                  <p>C-SCAN is particularly useful in systems where uniform response time is more important than maximum throughput.</p>
                </>
              }
              icon="🔄"
              color="#4cc9f0"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AlgorithmCard 
              title="C-LOOK (Circular LOOK)" 
              description={
                <>
                  <p>C-LOOK is a variant of LOOK that treats the disk as circular, similar to how C-SCAN is a variant of SCAN.</p>
                  <p>When the head reaches the last request in one direction, it immediately moves to the first request in the opposite direction without servicing requests on the return trip.</p>
                  <p>C-LOOK combines the efficiency of LOOK with the uniform service time of C-SCAN, making it one of the most commonly used algorithms in modern systems.</p>
                </>
              }
              icon="👁️"
              color="#06ffa5"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="cta-section" variants={itemVariants}>
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Start visualizing disk scheduling algorithms in 2D with interactive controls and real-time animations.</p>
          <Link to="/visualize" className="cta-button">
            <span>Start Visualization</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </motion.div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 4rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          padding: 0 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 2.5rem;
          font-weight: 300;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #4ecdc4;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .disk-animation {
          width: 300px;
          height: 300px;
          position: relative;
        }

        .disk-circle {
          width: 100%;
          height: 100%;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          position: relative;
          animation: rotate 20s linear infinite;
        }

        .track-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%);
        }

        .disk-head {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #ff6b6b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: moveHead 4s ease-in-out infinite;
        }

        .request-points {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .request-point {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #4ecdc4;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes moveHead {
          0%, 100% { left: 20%; }
          25% { left: 60%; }
          50% { left: 80%; }
          75% { left: 40%; }
        }

        @keyframes pulse {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateY(-50%) scale(1.2); opacity: 1; }
        }

        .algorithms-section {
          background: white;
          color: #333;
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-bottom: 3rem;
        }

        .algorithm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .cta-section {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 4rem 0;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.8rem;
          }

          .hero-stats {
            justify-content: center;
          }

          .algorithm-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default Home