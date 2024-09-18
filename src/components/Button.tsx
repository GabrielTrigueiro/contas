import React from 'react';

type ButtonProps = {
  label: string; // Obrigatório
  color?: string; // Opcional
  onClick: () => void; // Obrigatório
  disabled?: boolean; // Opcional
};

const CustomButton: React.FC<ButtonProps> = ({ label, color = 'blue', onClick, disabled = false }) => {
  const baseStyle = `font-bold py-2 px-4 border-b-4 rounded`;
  const colorClasses = {
    blue: `bg-blue-500 hover:bg-blue-400 text-white border-blue-700 hover:border-blue-500`,
    red: `bg-red-500 hover:bg-red-400 text-white border-red-700 hover:border-red-500`,
    green: `bg-green-500 hover:bg-green-400 text-white border-green-700 hover:border-green-500`,
  };

  const disabledStyle = `bg-gray-400 text-gray-700 border-gray-500 cursor-not-allowed`;

  const selectedColorClass = colorClasses[color as keyof typeof colorClasses] || '';

  return (
    <button
      className={`${baseStyle} ${disabled ? disabledStyle : selectedColorClass}`}
      onClick={!disabled ? onClick : undefined} // Previne onClick se desabilitado
      disabled={disabled} // Desabilita o botão nativamente
    >
      {label}
    </button>
  );
};

export default CustomButton;
