<script lang="ts">
  export let text: string;
  export let title: string | undefined;

  $: tip = title || text;
</script>

<button title="{tip}">{text}</button>
