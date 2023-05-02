<script lang="ts">
  import router from 'page';
  import { onMount } from 'svelte';
  import { filter, input } from '@/store';

  const selectInput = () => {
    const input: HTMLInputElement = document.querySelector('input')!;
    input.select();
  };

  const handleClearButton = () => {
    selectInput();
    input.set('');
  };

  const handleRoute = () => {
    const param = $filter.length ? `?filter=${$filter}` : '';
    router(`/${$input}${param}`);
  };

  onMount(() => !$input.length && selectInput());
</script>

<header>
  <form on:submit|preventDefault={handleRoute}>
    <input autocomplete="off" maxlength="25" placeholder="Search..." spellcheck="false" bind:value={$input} />
    {#if $input.length}
      <svg class="clear-icon" viewBox="0 0 24 24" on:click={handleClearButton}>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {/if}
    <button>
      <svg class="search-icon" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </form>
</header>

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  header {
    align-items: end;
    display: flex;
    justify-content: center;
    margin-top: 24px;

    form {
      display: flex;
      gap: 2px;
      position: relative;

      input,
      button {
        background: $primary-color;
        border: none;
        color: $text-color;
        transition: background-color 150ms;
      }

      input {
        appearance: none;
        border-radius: 6px 0 0 6px;
        font-family: Inter;
        font-size: 16px;
        font-variation-settings: 'wght' 400;
        height: 30px;
        padding: 5px 40px 5px 24px;
        width: 210px;

        &::placeholder {
          color: $text-color;
        }

        &:focus {
          box-shadow: inset 0 0 0 2px lighten($background-color, 13%);
          outline: none !important;
        }
      }

      svg {
        cursor: pointer;
        fill: none;
        padding: 6px;
        stroke: #cdcfe1;
      }

      .clear-icon {
        height: 24px;
        position: absolute;
        right: 56px;
        top: 2px;
        width: 24px;
      }

      button {
        border-radius: 0 6px 6px 0;
        cursor: pointer;
        height: 40px;
        position: relative;
        width: 52px;

        &:hover {
          background-color: lighten($background-color, 10%);
        }

        &:focus-visible {
          box-shadow: inset 0 0 0 2px lighten($background-color, 13%);
          outline: none !important;
        }

        svg {
          pointer-events: none;
          height: 26px;
          width: 26px;
        }
      }
    }
  }
</style>
