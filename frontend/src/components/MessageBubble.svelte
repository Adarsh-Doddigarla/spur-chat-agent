<script lang="ts">
  import type { Message } from "../lib/types";

  export let message: Message;

  function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
</script>

<div class="row" class:user={message.sender === "user"} class:ai={message.sender === "ai"}>
  <div class="group">
    <div class="bubble">{message.text}</div>
    <span class="time">{formatTime(message.createdAt)}</span>
  </div>
</div>

<style>
  .row {
    display: flex;
    margin: 4px 0;
  }

  .row.user { justify-content: flex-end; }
  .row.ai   { justify-content: flex-start; }

  .group {
    display: flex;
    flex-direction: column;
    max-width: 72%;
  }

  .row.user .group { align-items: flex-end; }
  .row.ai   .group { align-items: flex-start; }

  .bubble {
    padding: 10px 14px;
    font-size: 14px;
    line-height: 1.45;
    word-break: break-word;
  }

  .row.user .bubble {
    background: #2563eb;
    color: #fff;
    border-radius: 18px 18px 4px 18px;
  }

  .row.ai .bubble {
    background: #fff;
    color: #111827;
    border-radius: 18px 18px 18px 4px;
    border: 1px solid #e5e7eb;
  }

  .time {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 4px;
    padding: 0 4px;
  }
</style>
