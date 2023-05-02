<script lang="ts">
  let hidden = true;

  const handleOnScroll = () => {
    hidden = document.documentElement.scrollTop < 420;
  };

  const scrollToTop = () => {
    const input: HTMLInputElement = document.querySelector('input')!;
    input.select();
    window.scrollTo(0, 0);
  };
</script>

<svelte:window on:scroll={handleOnScroll} />
<div on:click={scrollToTop} class:hidden>
  <svg viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
  </svg>
</div>

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  div {
    align-items: center;
    background-color: lighten($primary-color, 5%);
    border-radius: 10px;
    bottom: 30px;
    cursor: pointer;
    display: flex;
    height: 60px;
    justify-content: center;
    position: fixed;
    right: 30px;
    transition: all 0.2s;
    visibility: visible;
    width: 60px;

    &:hover {
      transform: scale(105%);
    }

    svg {
      height: 34px;
      fill: none;
      stroke: $icon-color;
      width: 34px;
    }
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
