import React, { useState } from 'react';
import './App.css';
import VerifyOTP from './components/VerifyOTP';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className='App'>
      <div className='send__otp__wrapper'>
        <button className='btn send__otp' onClick={() => setShowPopup(true)}>
          Send OTP
        </button>
      </div>

      {showPopup && <VerifyOTP setShowPopup={setShowPopup} />}
    </div>
  );
}

export default App;
