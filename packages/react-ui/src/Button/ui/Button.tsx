import React from 'react';
import { ButtonProps } from '../index.props';
import './Button.scss';

export const Button: React.FC<ButtonProps> = (props) => {
  const { size, className, type, ...rest } = props;
  const cls = ['ru', size, className].filter(Boolean).join(' ');
  return (
    <button {...rest} type={type} className={cls}>
      {props.children}
    </button>
  );
};
