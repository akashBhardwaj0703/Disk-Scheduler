import { Link } from 'react-router-dom'
import AlgorithmCard from '../components/AlgorithmCard'

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Disk Scheduling Algorithms</h1>
        <p>Understand and visualize how operating systems manage disk I/O requests</p>
      </div>

      <div className="algorithm-grid">
        <AlgorithmCard 
          title="FCFS (First Come First Serve)" 
          description={
            <>
              <p>FCFS is the simplest disk scheduling algorithm. It services requests in the order they arrive in the disk queue without any reordering.</p>
              <p>The main advantage of FCFS is its simplicity and fairness, as every request gets serviced in the order it was received.</p>
              <p>However, FCFS can result in poor performance because it doesn't optimize seek time. The total head movement can be quite large compared to other algorithms.</p>
              <p>For example, if the queue has requests for tracks 98, 183, 37, 122, and the head starts at 53, it will move 45, then 85, then 146, then 85 tracks - totaling 361 tracks.</p>
              <p>FCFS can lead to the "convoy effect" where a few slow requests delay all subsequent requests, similar to how slow vehicles on a single-lane road hold up faster traffic behind them.</p>
            </>
          }
        />

        <AlgorithmCard 
          title="SSTF (Shortest Seek Time First)" 
          description={
            <>
              <p>SSTF selects the request with the minimum seek time from the current head position. This approach minimizes the total seek time compared to FCFS.</p>
              <p>After servicing each request, SSTF selects the nearest pending request from the current head position. This is similar to the shortest-job-first (SJF) scheduling algorithm.</p>
              <p>SSTF provides better performance than FCFS in terms of average response time and total head movement. However, it may cause starvation of some requests.</p>
              <p>If there are many requests close to the current head position, requests farther away may never get serviced if new closer requests keep arriving (starvation).</p>
              <p>SSTF is not actually an optimal algorithm, but it generally performs better than FCFS while being relatively simple to implement.</p>
            </>
          }
        />

        <AlgorithmCard 
          title="SCAN (Elevator Algorithm)" 
          description={
            <>
              <p>The SCAN algorithm moves the disk arm back and forth across the disk, servicing requests as it reaches them. This is similar to how an elevator works - it moves in one direction until it reaches the end, then reverses direction.</p>
              <p>In SCAN, the head starts at one end of the disk and moves toward the other end, servicing requests as it goes. When it reaches the other end, it reverses direction and services requests on the return trip.</p>
              <p>SCAN provides a more uniform wait time compared to SSTF and prevents starvation. However, requests at the edges of the disk may have to wait longer.</p>
              <p>A variant called C-SCAN (Circular SCAN) treats the disk as circular. When the head reaches one end, it immediately returns to the beginning without servicing requests on the return trip.</p>
              <p>SCAN and its variants generally provide better performance than FCFS and SSTF in terms of both throughput and response time variance.</p>
            </>
          }
        />

        <AlgorithmCard 
          title="LOOK Algorithm" 
          description={
            <>
              <p>LOOK is a variant of SCAN where the disk arm only goes as far as the last request in each direction instead of going all the way to the end of the disk.</p>
              <p>This improves upon SCAN by not wasting time moving to the physical end of the disk if there are no requests there. The head reverses direction immediately after servicing the last request in each direction.</p>
              <p>LOOK has the same advantages as SCAN in terms of preventing starvation and providing uniform service, while reducing unnecessary head movement.</p>
              <p>Like SCAN, there's a C-LOOK variant that moves the head to the first request in the opposite direction instead of servicing requests on the return trip.</p>
              <p>LOOK and C-LOOK are the most commonly used disk scheduling algorithms in modern operating systems due to their balanced performance characteristics.</p>
            </>
          }
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/visualize" className="btn btn-primary">Let's Visualize</Link>
      </div>
    </div>
  )
}

export default Home