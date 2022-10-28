import React from 'react';
import { Button } from 'react-ui/src';

export interface IndexPageProps {
  id?: string;
}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { id } = props;
  return (
    <div id={id}>
      <h1>IndexPageProps</h1>
      <Button className='my-btn'>hello</Button>
    </div>
  );
};

export default IndexPage;
