import { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputData {
  name: string;
  type: string;
  placeholder: string;
  defaultValue: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  defaultValue,
}: InputData) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <p>{error}</p>
    </Container>
  );
};

export default Input;
