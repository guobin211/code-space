import { getClientProps, getRootElement, IS_CLIENT } from '../shared';
import Page from './about.svelte';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export async function renderToString() {
  // todo! 实现服务端渲染
  return '';
}

const mount = () => {
  const target = getRootElement();
  const props = getClientProps();
  new Page({
    target,
    props,
  });
};

(() => {
  if (IS_CLIENT) {
    mount();
  }
})();
