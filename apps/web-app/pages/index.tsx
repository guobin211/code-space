import React, { CSSProperties } from 'react';

export interface IndexProps {
  className?: string;
  style?: CSSProperties;
}

const Index: React.FC<IndexProps> = (props) => {
  const { className, style } = props;
  return (
    <div className={className} style={style}>
      Index
    </div>
  );
};

export default Index;
