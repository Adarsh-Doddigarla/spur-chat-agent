<script lang="ts">
  import ChatWidget from "./components/ChatWidget.svelte";
</script>

<main>
  <ChatWidget />
</main>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: #f1f5f9;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    min-height: 100vh;
  }

  main {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 380px;
    height: 560px;
    background: #fff;
    border-radius: 16px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
</style>
