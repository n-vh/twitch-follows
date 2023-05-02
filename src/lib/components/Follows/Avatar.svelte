<script lang="ts">
  import type { Follow } from '@/types';

  let hover = false;

  const toggle = () => {
    hover = !hover;
  };

  export let follow: Follow;
</script>

<div class="avatar" on:mouseenter={toggle} on:mouseleave={toggle}>
  {#if hover}
    <div class="overlay">
      <a href="https://www.twitch.tv/{follow.login}" target="_blank">
        <svg class="twitch" width="30" height="30" viewBox="0 0 256 268">
          <path
            d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.886H40.717V23.263zm64.008 116.405H128V69.844h-23.275v69.824zm63.997 0h23.27V69.844h-23.27v69.824z"
          />
        </svg>
      </a>
      <a href="/{follow.login}">
        <svg class="search" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </a>
    </div>
  {/if}
  {#if follow.avatar}
    <img src={follow.avatar} alt={follow.login} />
  {:else}
    <svg height="108px" viewBox="0 0 30 30">
      <path
        class="bottom"
        d="M20.354 28.826c.4.351.85.63 1.334.826l.312.115a4.7 4.7 0 0 0 1.462.233h1.23V15.247c0-6.297-5.08-11.4-11.346-11.4S2 8.95 2 15.246V30h1.23a4.698 4.698 0 0 0 3.108-1.174l.758-.653c.405-.356.904-.48 1.442-.48.538 0 1.038.124 1.443.48l1.026.944a3.542 3.542 0 0 0 4.678 0l.997-.912c.405-.356.934-.513 1.472-.513.538 0 1.037.157 1.442.513l.758.621z"
      />
      <path
        class="top"
        d="M18.923 13.077a1.923 1.923 0 1 1 3.846 0 1.923 1.923 0 0 1-3.846 0zm-5.385-1.923a1.923 1.923 0 1 1 0 3.846 1.923 1.923 0 0 1 0-3.846zM24.2 24.98l-.758-.621c-.404-.356-.904-.513-1.442-.513-.538 0-1.068.157-1.472.513l-.996.912a3.542 3.542 0 0 1-4.68 0l-1.025-.944c-.405-.356-.905-.48-1.443-.48-.537 0-1.037.124-1.442.48l-.758.653a4.713 4.713 0 0 1-3.108 1.174h-1.23V11.4c0-6.296 5.08-11.4 11.346-11.4 6.267 0 11.346 5.104 11.346 11.4v14.754h-1.23a4.7 4.7 0 0 1-1.462-.234l-.311-.114a4.719 4.719 0 0 1-1.335-.826zm.978-2.68l.668.548V11.4c0-4.823-3.884-8.708-8.654-8.708-4.769 0-8.654 3.885-8.654 8.708v11.443l.639-.55c1.048-.914 2.26-1.14 3.208-1.14.951 0 2.169.228 3.22 1.152l.022.02 1.019.937a.85.85 0 0 0 1.094-.002l1.01-.923c1-.88 2.211-1.183 3.25-1.183 1.062 0 2.211.316 3.178 1.146z"
      />
    </svg>
  {/if}
</div>

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  .avatar {
    align-items: center;
    background-color: darken($primary-color, 8%);
    display: flex;
    height: 240px;
    justify-content: center;
    position: relative;
    width: 100%;

    .overlay {
      align-items: center;
      background-color: #000000a6;
      display: flex;
      gap: 6px;
      height: 100%;
      justify-content: center;
      position: absolute;
      opacity: 0;
      transition: opacity 0.1s;
      width: 100%;

      &:hover {
        opacity: 1;
      }

      a {
        border-radius: 50%;
        cursor: pointer;
        height: 30px;
        padding: 14px;
        transition: background-color 50ms ease;
        width: 30px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
      }

      .twitch {
        color: $icon-color;
        fill: $icon-color;
      }

      .search {
        fill: none;
        stroke: $icon-color;
      }
    }

    img {
      width: 100%;
    }

    svg {
      pointer-events: none;

      .bottom {
        fill: #86868f;
      }

      .top {
        fill: #42424c;
      }
    }
  }
</style>
