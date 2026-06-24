<script lang="ts">
  import { afterUpdate } from "svelte";
  import { chatStore } from "../lib/stores/chat";
  import MessageBubble from "./MessageBubble.svelte";
  import TypingIndicator from "./TypingIndicator.svelte";

  let listEl: HTMLDivElement;

  afterUpdate(() => {
    listEl?.scrollTo({ top: listEl.scrollHeight, behavior: "smooth" });
  });
</script>

<div class="list" bind:this={listEl}>
  {#each $chatStore.messages as message (message.id)}
    <MessageBubble {message} />
  {/each}

  {#if $chatStore.status === "sending"}
    <div class="indicator-row">
      <TypingIndicator />
    </div>
  {/if}
</div>

<style>
  .list {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #f9fafb;
    scroll-behavior: smooth;
  }

  .list::-webkit-scrollbar { width: 4px; }
  .list::-webkit-scrollbar-track { background: transparent; }
  .list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  .indicator-row {
    display: flex;
    justify-content: flex-start;
    margin: 4px 0;
  }
</style>
