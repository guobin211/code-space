import React from 'react';

export interface ExampleProps {
  title: string;
}

const Example: React.FC<ExampleProps> = (props) => {
  const { title } = props;
  const handleClick = () => {
    console.log(title);
  };
  return (
    <div>
      <h1 onClick={handleClick}>{title}</h1>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      title: 'hello world',
    },
  };
};

export default Example;
