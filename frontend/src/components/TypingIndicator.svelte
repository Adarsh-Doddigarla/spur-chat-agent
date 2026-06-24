<div class="bubble">
  <span></span>
  <span></span>
  <span></span>
</div>

<style>
  .bubble {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 12px 14px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px 18px 18px 4px;
    width: fit-content;
  }

  span {
    width: 7px;
    height: 7px;
    background: #9ca3af;
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out;
  }

  span:nth-child(2) { animation-delay: 0.2s; }
  span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40%           { transform: translateY(-5px); }
  }
</style>
