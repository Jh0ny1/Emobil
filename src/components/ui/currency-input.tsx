
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { formatCurrency, parseCurrency } from '@/utils/formatters';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | string;
  onChange: (value: number) => void;
  className?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');
  
  // Atualiza o valor exibido quando o valor da prop muda
  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(formatCurrency(value));
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Remove qualquer formatação existente
    let numericValue = rawValue.replace(/[^\d]/g, '');
    
    // Converte para centavos e depois para reais
    const floatValue = parseInt(numericValue) / 100;
    
    // Atualiza o valor formatado no input
    setDisplayValue(formatCurrency(floatValue));
    
    // Notifica o componente pai do novo valor
    onChange(floatValue);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Seleciona todo o texto quando o input recebe foco
    e.target.select();
    
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      className={className}
      {...props}
    />
  );
};

export default CurrencyInput;
