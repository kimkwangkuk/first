import React from 'react';
import { animated, useTransition } from '@react-spring/web';

function EarningsBottomSheet({ isOpen, onClose }) {
  // useTransition을 사용하여 마운트/언마운트 제어
  const transition = useTransition(isOpen, {
    from: { 
      transform: 'translateY(100%)',
      opacity: 0 
    },
    enter: { 
      transform: 'translateY(0%)',
      opacity: 1 
    },
    leave: { 
      transform: 'translateY(100%)',
      opacity: 0 
    },
    config: {
      tension: 280,
      friction: 24
    }
  });

  const bottomSheetStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    background: 'white',
    boxShadow: '0px -4px 20px rgba(0,0,0,0.1)',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '20px',
    touchAction: 'none',
    overflowY: 'auto',
    zIndex: 1000
  };

  // EPS 데이터 (예시)
  const epsData = {
    '1Q': { actual: 4.5, estimate: 4.2 },
    '2Q': { actual: 4.8, estimate: 4.6 },
    '3Q': { estimate: 5.0 }
  };

  return transition((style, item) =>
    item && (
      <>
        {/* 오버레이 */}
        <animated.div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            opacity: style.opacity
          }} 
          onClick={onClose}
        />
        
        {/* 바텀시트 */}
        <animated.div style={{
          ...bottomSheetStyle,
          ...style
        }}>
          {/* 닫기 버튼 */}
          <div style={{ 
            position: 'absolute',
            right: '20px',
            top: '20px',
            zIndex: 1001
          }}>
            <button 
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              닫기
            </button>
          </div>

          {/* 실적 진행 상태 */}
          <div style={{ marginTop: '20px', marginBottom: '30px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              position: 'relative',
              padding: '0 20px'
            }}>
              {/* 프로그레스 바 배경 */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50px',
                right: '50px',
                height: '2px',
                backgroundColor: '#e2e8f0',
                zIndex: 1
              }} />
              
              {/* 진행된 프로그레스 바 */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50px',
                width: '60%',
                height: '2px',
                backgroundColor: '#3498db',
                zIndex: 2
              }} />

              {/* 실적 포인트들 */}
              {['1Q', '2Q', '3Q'].map((quarter, index) => (
                <div key={quarter} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  zIndex: 3,
                  backgroundColor: 'white',
                  padding: '0 10px'
                }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '12px', 
                    backgroundColor: index < 2 ? '#3498db' : '#e2e8f0',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: index < 2 ? 'white' : '#64748b',
                    fontSize: '12px'
                  }}>{quarter}</div>
                  <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                    {index === 0 ? '1월' : index === 1 ? '3월' : '5월'}
                  </span>
                  
                  {/* EPS 그래프 */}
                  <div style={{ 
                    width: '80px',
                    backgroundColor: '#f8fafc',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    {epsData[quarter].actual ? (
                      <>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: 'bold',
                          color: '#3498db',
                          marginBottom: '4px'
                        }}>
                          ${epsData[quarter].actual}
                        </div>
                        <div style={{ 
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                          Est. ${epsData[quarter].estimate}
                        </div>
                      </>
                    ) : (
                      <div style={{ 
                        fontSize: '12px',
                        color: '#64748b'
                      }}>
                        Est. ${epsData[quarter].estimate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 기존 내용 */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>2024 1Q</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>2024.01.25</p>
          </div>

          {/* 나머지 기존 코드... */}
        </animated.div>
      </>
    )
  );
}

export default EarningsBottomSheet;