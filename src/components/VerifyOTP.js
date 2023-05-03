import React, { useState } from 'react';
import './VerifyOTP.css';
import OtpInput from './OtpInput';

const VerifyOTP = ({ setShowPopup }) => {
  const [otp, setOtp] = useState('');
  const onChange = (value) => setOtp(value);

  return (
    <>
      <div className='votp__backdrop'>
        <div className='votp__container'>
          <div className='votp__header'>
            <h3>Phone Verification</h3>
          </div>

          <div className='votp__content'>
            <p className='enter__otp__text'>
              Enter the OTP you received on 89206-6XXXX
            </p>
            <div className='input__container'>
              <OtpInput value={otp} valueLength={6} onChange={onChange} />
              <div className='dflex' style={{ marginTop: '20px' }}>
                <button className='text__btn'>Change Number</button>
                <button className='text__btn'>Re-send OTP</button>
              </div>
              <button
                className='btn send__otp d-block mx-auto'
                style={{ marginTop: '40px', marginBottom: '15px' }}
                onClick={() => console.log(otp)}
              >
                Verify Phone Number
              </button>
              <div className='close__otp__modal'>
                <button
                  className='text__btn'
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
