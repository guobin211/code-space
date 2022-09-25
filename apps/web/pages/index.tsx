import React, { useContext, useEffect } from 'react';
import { Button } from 'react-ui/src';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { createApp } from '../store/createApp';
import store, { AppContext } from '../store/store';

interface WebProps {
  query: ParsedUrlQuery;
  children?: React.ReactNode;
}

const Web: React.FC<WebProps> = (props) => {
  const { children } = props;

  const { count } = useContext(AppContext);
  const age = store.getState().age;

  const handleClick = () => {
    store.setState({
      count: count + 1,
    });
  };

  useEffect(() => {
    console.log(typeof children);
  }, []);

  return (
    <div>
      <h1>Web</h1>
      <h2>username {store.getState().username}</h2>
      <h2>age {age}</h2>
      <h2>count {count}</h2>
      <div>
        <Button onClick={handleClick}>add count</Button>
      </div>
      <div>
        <Button
          onClick={() => {
            store.setState({ age: age + 1 });
          }}
        >
          add age
        </Button>
      </div>
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

const WebApp = createApp(Web);

export default WebApp;
