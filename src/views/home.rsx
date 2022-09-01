<script lang="rust">
use database;
pub async fn get_static_props() {
  let result = database.query("").await?;
  {
    props: {
      data: result
    }
  }
}
</script>

<script lang="ts">
import { onMount } from '@rsx/client';

export let props: { data: string };
const [title, setTitle] = useState(props.data);

onMount(() => {
  console.log('props.data', title);
  fetch('/api/home/title')
    .then(res => res.json())
    .then(data => {
      setTitle(data);
    });
});
</script>

<template>
  <div class="home">
    hello  {{title}}
  </div>
</template>

<style>
.home {
  font-size: 24px;
}
</style>
