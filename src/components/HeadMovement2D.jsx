import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const HeadMovement2D = ({ sequence, currentStep, requests, algorithm }) => {
  const [chartData, setChartData] = useState(null)
  const [chartOptions, setChartOptions] = useState(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (sequence.length === 0) return

    // Create data points for the chart
    const dataPoints = sequence.map((pos, index) => ({
      x: index,
      y: pos,
      isCurrent: index === currentStep,
      isRequest: requests.includes(pos)
    }))

    // Create the chart data
    const data = {
      labels: dataPoints.map((_, index) => `Step ${index}`),
      datasets: [
        {
          label: 'Head Movement Path',
          data: dataPoints.map(point => point.y),
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#4361ee',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2
        },
        {
          label: 'Request Points',
          data: dataPoints.map(point => point.isRequest ? point.y : null),
          borderColor: '#f72585',
          backgroundColor: '#f72585',
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointStyle: 'circle',
          showLine: false
        },
        {
          label: 'Current Position',
          data: dataPoints.map(point => point.isCurrent ? point.y : null),
          borderColor: '#ff6b6b',
          backgroundColor: '#ff6b6b',
          borderWidth: 3,
          pointRadius: 10,
          pointHoverRadius: 12,
          pointStyle: 'rectRot',
          showLine: false
        }
      ]
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: '600'
            }
          }
        },
        title: {
          display: true,
          text: `${algorithm} Algorithm - Disk Head Movement`,
          font: {
            size: 16,
            weight: 'bold'
          },
          color: '#2c3e50'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#4361ee',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            title: function(context) {
              return `Step ${context[0].dataIndex}`
            },
            label: function(context) {
              if (context.dataset.label === 'Head Movement Path') {
                return `Position: ${context.parsed.y}`
              } else if (context.dataset.label === 'Request Points') {
                return `Request at: ${context.parsed.y}`
              } else if (context.dataset.label === 'Current Position') {
                return `Current: ${context.parsed.y}`
              }
              return context.dataset.label + ': ' + context.parsed.y
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Steps',
            font: {
              size: 14,
              weight: '600'
            },
            color: '#2c3e50'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#7f8c8d',
            font: {
              size: 12
            }
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Track Position (0-199)',
            font: {
              size: 14,
              weight: '600'
            },
            color: '#2c3e50'
          },
          min: 0,
          max: 199,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#7f8c8d',
            font: {
              size: 12
            },
            stepSize: 50
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [sequence, currentStep, requests, algorithm])

  if (!chartData || !chartOptions) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <p>Loading visualization...</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
      
      <div className="chart-info">
        <div className="info-item">
          <span className="info-label">Algorithm:</span>
          <span className="info-value">{algorithm}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Current Step:</span>
          <span className="info-value">{currentStep + 1} / {sequence.length}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Current Position:</span>
          <span className="info-value">{sequence[currentStep]}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Total Requests:</span>
          <span className="info-value">{requests.length}</span>
        </div>
      </div>

      <style jsx>{`
        .chart-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        .chart-wrapper {
          height: 400px;
          position: relative;
        }

        .chart-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          background: white;
          border-radius: 12px;
          color: #7f8c8d;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4361ee;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .chart-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }

        .info-label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        .info-value {
          color: #4361ee;
          font-weight: 700;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .chart-container {
            padding: 1rem;
          }
          
          .chart-wrapper {
            height: 300px;
          }
          
          .chart-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default HeadMovement2D 