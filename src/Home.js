import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import EarningsBottomSheet from './components/EarningsBottomSheet';

// 필터 데이터
const filters = ['1일', '1주', '1달', '1년', '실적'];

function Home() {
  const [selectedFilter, setSelectedFilter] = useState('실적');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const openSheet = (quarter) => {
    console.log('openSheet called with quarter:', quarter);
    setSelectedQuarter(quarter);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 헤더 섹션 */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h1 style={{ 
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: '600',
            marginRight: '12px',
            marginBottom: 0
          }}>NVDA</h1>
          <span style={{
            fontSize: '14px',
            color: '#666',
            fontWeight: '500'
          }}>
            NVIDIA Corporation
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'baseline'
        }}>
          <span style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2c3e50',
            marginRight: '12px'
          }}>
            $890.90
          </span>
          <span style={{
            fontSize: '16px',
            color: '#22c55e',
            fontWeight: '500'
          }}>
            +12.24 (1.39%)
          </span>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        padding: '0 20px'
      }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedFilter === filter ? '#3498db' : '#f1f5f9',
              color: selectedFilter === filter ? 'white' : '#64748b',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 차트 컴포넌트 */}
      <ChartComponent 
        selectedFilter={selectedFilter}
        openSheet={openSheet}
      />

      {/* 바텀시트 */}
      <EarningsBottomSheet 
        isOpen={isOpen}
        onClose={closeSheet}
        quarter={selectedQuarter}
      />
    </div>
  );
}

export default Home;