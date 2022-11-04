import { getClientProps, getRootElement, IS_CLIENT } from '../shared';

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
  console.log('about page', target, props);
};

(() => {
  if (IS_CLIENT) {
    mount();
  }
})();
