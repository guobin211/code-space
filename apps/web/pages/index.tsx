import { MouseEventHandler } from 'react';
import { Button } from 'ui/src';
import { GetServerSideProps } from 'next';

const Web = () => {
  const handleClick: MouseEventHandler = (event) => {
    console.log('clicked', event);
  };
  return (
    <div>
      <h1>Web</h1>
      <Button onClick={handleClick}>Hello Web</Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default Web;
