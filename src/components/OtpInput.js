import React, { useMemo } from 'react';
import './OtpInput.css';

const OtpInput = ({ value, valueLength, onChange }) => {
  // create otp input fields based on the given length
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  // handle input change
  const inputOnChange = (e, index) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling;
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, index) + targetValue + value.substring(index + 1);
      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur();
    }
  };

  // handle input focus
  const inputOnFocus = (e) => {
    const { target } = e;
    const prevInputEl = target.previousElementSibling;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  // handle ion key down or delete
  const inputOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }
    focusToPrevInput(target);
  };

  // focus on next input when a digit is entered
  const focusToNextInput = (target) => {
    const nextElementSibling = target.nextElementSibling;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  // focus on prev input when a digit is deleted
  const focusToPrevInput = (target) => {
    const previousElementSibling = target.previousElementSibling;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  return (
    <div className='dflex inputs' style={{ marginTop: '50px' }}>
      {valueItems.map((digit, index) => (
        <input
          key={index}
          className='opt__input'
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          pattern='\d{1}'
          maxLength={valueLength}
          value={digit}
          onKeyDown={inputOnKeyDown}
          onChange={(e) => inputOnChange(e, index)}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

// Regex exp to check if the value is a number
export const RE_DIGIT = new RegExp(/^\d+$/);

export default OtpInput;
