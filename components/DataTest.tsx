import { useEffect, useState } from 'react';

export function DataTest() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    async function testFetch() {
      try {
        console.log('Testing data fetch...');
        const response = await fetch('/data/settings.json');
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        setStatus('✅ Data loaded successfully!');
      } catch (error) {
        console.error('Error details:', error);
        setStatus(`❌ Error: ${error.message}`);
      }
    }

    testFetch();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: 'red', 
      color: 'white', 
      padding: '10px', 
      zIndex: 9999 
    }}>
      Data Test: {status}
    </div>
  );
}