<script lang="ts">
  import { chatStore, sendMessage } from "../lib/stores/chat";

  let text = "";

  $: disabled = $chatStore.status === "sending";

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    text = "";
    sendMessage(trimmed);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
</script>

<div class="input-bar">
  <textarea
    bind:value={text}
    on:keydown={handleKeydown}
    {disabled}
    rows={1}
    placeholder="Type a message..."
  ></textarea>
  <button on:click={handleSend} {disabled} aria-label="Send">&#10148;</button>
</div>

<style>
  .input-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #e5e7eb;
    background: #fff;
    flex-shrink: 0;
  }

  textarea {
    flex: 1;
    resize: none;
    border: none;
    outline: none;
    font-size: 14px;
    font-family: inherit;
    line-height: 1.4;
    background: transparent;
    color: #111827;
    padding: 4px 0;
  }

  textarea::placeholder { color: #9ca3af; }
  textarea:disabled { cursor: not-allowed; opacity: 0.6; }

  button {
    width: 36px;
    height: 36px;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s, transform 0.1s;
    line-height: 1;
  }

  button:hover:not(:disabled) { background: #1d4ed8; transform: scale(1.05); }
  button:disabled { background: #93c5fd; cursor: not-allowed; }
</style>
