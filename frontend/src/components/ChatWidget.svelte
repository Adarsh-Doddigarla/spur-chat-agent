<script lang="ts">
  import { onMount } from "svelte";
  import { loadHistory } from "../lib/stores/chat";
  import MessageList from "./MessageList.svelte";
  import MessageInput from "./MessageInput.svelte";

  onMount(() => {
    loadHistory();
  });
</script>

<div class="widget">
  <header class="header">
    <div class="header-text">
      <span class="title">Northwind Support</span>
      <span class="subtitle">We typically reply instantly</span>
    </div>
    <div class="status-dot"></div>
  </header>
  <MessageList />
  <MessageInput />
</div>

<style>
  .widget {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    background: #1e40af;
    flex-shrink: 0;
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.01em;
  }

  .subtitle {
    font-size: 12px;
    color: #bfdbfe;
  }

  .status-dot {
    width: 10px;
    height: 10px;
    background: #4ade80;
    border-radius: 50%;
    border: 2px solid #1e40af;
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.4);
  }
</style>
