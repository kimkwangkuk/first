import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend } from 'recharts';
import EarningsBubble from './EarningsBubble';

// CustomTooltip 컴포넌트 정의
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, color: '#2c3e50' }}>{`주가: ${payload[0].value}`}</p>
        {payload[1] && (
          <p style={{ margin: 0, color: '#e74c3c' }}>{`EPS: ${payload[1].value}`}</p>
        )}
      </div>
    );
  }
  return null;
};

// 차트 데이터 생성 함수
const generateChartData = (period) => {
  switch (period) {
    case '1일':
      return [
        { name: '10:00', price: 880 },
        { name: '11:00', price: 885 },
        { name: '12:00', price: 890 },
        { name: '13:00', price: 888 },
        { name: '14:00', price: 892 },
        { name: '15:00', price: 890.90 }
      ];
    
    case '1주':
      return [
        { name: '월', price: 870 },
        { name: '화', price: 875 },
        { name: '수', price: 885 },
        { name: '목', price: 888 },
        { name: '금', price: 890.90 }
      ];
    
    case '1달':
      return [
        { name: '1주', price: 850 },
        { name: '2주', price: 865 },
        { name: '3주', price: 880 },
        { name: '4주', price: 890.90 }
      ];
    
    case '1년':
      return [
        { name: '1월', price: 700 },
        { name: '2월', price: 750 },
        { name: '3월', price: 800 },
        { name: '4월', price: 820 },
        { name: '5월', price: 840 },
        { name: '6월', price: 860 },
        { name: '7월', price: 870 },
        { name: '8월', price: 880 },
        { name: '9월', price: 885 },
        { name: '10월', price: 890 },
        { name: '11월', price: 888 },
        { name: '12월', price: 890.90 }
      ];
    
    case '실적':
      return [
        { name: '11월', price: 350, eps: 18, isEarningsDate: true, quarter: '2023 4Q' },
        { name: '12월', price: 380},
        { name: '1월', price: 400, eps: 20, isEarningsDate: true, quarter: '2024 1Q' },
        { name: '2월', price: 300},
        { name: '3월', price: 500, eps: 25, isEarningsDate: true, quarter: '2024 2Q' },
        { name: '4월', price: 200 },
        { name: '5월', price: null, isEarningsDate: true, quarter: '2024 3Q' }
      ];
    
    default:
      return [];
  }
};

const ChartComponent = ({ selectedFilter, openSheet }) => {
  const chartData = generateChartData(selectedFilter);

  return (
    <div style={{ height: '460px', marginTop: '40px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{ top: 60, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="name" 
            stroke="#666"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="price"
            hide={true} 
            domain={['dataMin - 50', 'dataMax + 50']} 
          />
          <YAxis 
            yAxisId="eps"
            orientation="right"
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3498db" 
            strokeWidth={2}
            yAxisId="price"
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <g>
                  {payload.price && (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill="#3498db"
                    />
                  )}
                  {payload.isEarningsDate && (
                    <EarningsBubble
                      cx={cx}
                      cy={cy || 0}
                      quarter={payload.quarter}
                      name={payload.name}
                      onClick={openSheet}
                    />
                  )}
                </g>
              );
            }}
            activeDot={{ r: 6 }}
            name="주가"
            connectNulls={true}
          />
          {selectedFilter === '실적' && (
            <Line
              type="monotone"
              dataKey="eps"
              stroke="#e74c3c"
              strokeWidth={2}
              yAxisId="eps"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="EPS"
              connectNulls={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent; 