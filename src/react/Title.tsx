import type React from 'react';

export interface TitleProps {
  children: string | React.ReactNode;
}

export const Title: React.FC<TitleProps> = (props) => {
  return <h1>{props.children}</h1>;
};

export default Title;
