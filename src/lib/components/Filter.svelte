<script lang="ts">
  import { filter, follows, loading } from '@/store';
  import { SkeletonFilter } from '@/components';

  const selectInput = () => {
    const input: HTMLInputElement = document.querySelector('#filter')!;
    input.select();
  };

  const handleClearButton = () => {
    selectInput();
    filter.set('');
  };

  filter.subscribe((value) => {
    window.history.replaceState('', '', value ? `?filter=${value}` : window.location.pathname);
  });
</script>

{#if ($filter.length && $follows.follows.length) || $follows.total}
  <form>
    <input id="filter" bind:value={$filter} autocomplete="off" maxlength="25" placeholder="Filter..." spellcheck="false" />
    {#if $filter.length}
      <svg viewBox="0 0 24 24" on:click={handleClearButton}>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {/if}
  </form>
{:else if $loading}
  <SkeletonFilter />
{/if}

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  form {
    position: relative;

    input {
      appearance: none;
      background: $primary-color;
      border: none;
      border-radius: 6px;
      color: $text-color;
      font-family: Inter;
      font-size: 14px;
      height: 25px;
      margin-right: 1px;
      padding: 5px 35px 5px 20px;
      width: 185px;

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
      height: 23px;

      left: 202px;
      padding: 6px;
      position: absolute;
      stroke: #cdcfe1;
      top: 0px;
      width: 23px;
    }
  }
</style>
