<script lang="rust">
use rsx::server::{ Request, Response };
use api::database;

// get server side props by request
pub async fn get_server_side_props(request: Request) -> Response {
  let id = request.query.get("id");
  let result = database.query_by_id(id).await?;
  Response::json({
    props: {
      data: result
    }
  })
}
</script>

<script lang="ts">
import { onMount, getRequestInfo, Request } from 'rsx/client';

// component props with reactive
export let props: { data: string };
// constant from runtime
const requestInfo: Request = getRequestInfo();
// component state
let title = '';

onMount(() => {
  console.log('props', props);
  // 服务端请求信息
  console.log('requestInfo', requestInfo);

  fetch('/api/home/title')
    .then((res) => res.json())
    .then((data) => {
      title = data;
    });
});
</script>

<template>
  <div class="home">hello {{ title }}</div>
</template>

<style>
.home {
  font-size: 24px;
}
</style>
