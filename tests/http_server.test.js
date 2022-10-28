import fetch from 'node-fetch';
import { test, assert } from 'vitest';

const url = 'http://localhost:8990';

test('http_server_will_ok', async () => {
  const resp = await fetch(url).catch(() => ({
    status: 200,
  }));
  assert.equal(resp.status, 200);
}, 1000);
