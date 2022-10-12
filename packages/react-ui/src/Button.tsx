import React, { HTMLAttributes } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type?: 'primary' | 'error' | 'pure';
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { type, className, ...rest } = props;
  const cls = [type, className].filter(Boolean).join(' ');
  return (
    <button {...rest} type='button' className={cls}>
      {props.children}
    </button>
  );
};
