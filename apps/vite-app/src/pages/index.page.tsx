import React from 'react';

export interface IndexPageProps {
  id?: string;
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { id } = props;
  return (
    <div id={id}>
      <h1>IndexPageProps</h1>
    </div>
  );
};

export default IndexPage;
