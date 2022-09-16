import React, { HTMLAttributes } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type?: 'primary' | 'error' | 'pure';
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { type, className, ...rest } = props;
  return (
    <button {...rest} type="button" className={`${type} ${className}`}>
      {props.children}
    </button>
  );
};
