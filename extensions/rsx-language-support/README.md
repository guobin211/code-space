# rsx-language-support

## Example 

```
<script lang="rust">
pub async fn get_props(ctx: Context) -> Props {
    Props {
        msg: "Hello World".to_string(),
    }
}
</script>

<script lang="js">
    export let msg;
</script>

<template>
    <div class="app">
        server msg is : {{ msg }}
    </div>
</template>

<style>
    .app {
        font-size: 20px;
    }
</style>
```