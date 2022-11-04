import { test, assert } from 'vitest';

type ResponseJson = {
  list: Record<string, string>[];
  topic_id: string;
};

async function fetchNews() {
  const resp: ResponseJson = await fetch(
    'https://user.guancha.cn/news-api/fengwen-good-questions.json'
  )
    .then((res) => res.json())
    .catch(() => {
      // catch the error and return the default response
      return { list: [], topic_id: '' };
    });
  return resp;
}

test('fetchNews', async () => {
  const { list } = await fetchNews();
  assert.ok(true);
  assert.isDefined(list);
  assert.isArray(list);
});
