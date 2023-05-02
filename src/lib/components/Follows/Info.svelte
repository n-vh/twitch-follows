<script lang="ts">
  import type { Follow } from '@/types';
  import { formatLocalDate } from '@/utils/time';
  import { isValidUsername } from '@/utils/username';

  export let follow: Follow;
</script>

<div class="info">
  <div class="wrapper">
    <div class="username" class:banned={follow.isBanned}>
      {#if follow.isPartner}
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <path
            d="M10 2l6 2 2 6-2 6-6 2-6-2-2-6 2-6 6-2zM8.889 13.636l5.43-5.429-1.415-1.414-4.015 4.015-2.015-2.015-1.414 1.414 3.429 3.43z"
          />
        </svg>
      {/if}
      <span class="display-name">{follow.displayName}</span>
      {#if !isValidUsername(follow.displayName)}
        <span class="login">({follow.login})</span>
      {/if}
    </div>
  </div>
  <div class:banned={follow.isBanned} class="date">
    <span>{formatLocalDate(follow.date)}</span>
  </div>
</div>

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  .info {
    background-color: $primary-color;
    display: flex;
    flex-direction: column;
    height: 90px;

    .wrapper {
      background-color: $background-color;
      border-radius: 6px;
      margin: 12px 12px 0 12px;
      position: relative;
      width: 216px;

      .username {
        align-items: center;
        display: flex;
        gap: 2px;
        height: 34px;
        justify-content: center;
        margin: auto;
        max-width: 190px;

        svg {
          fill: $twitch-color;
        }

        .display-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .login {
          font-size: 14px;
          font-variation-settings: 'wght' 400;
        }
      }
    }

    :global(span) {
      font-variation-settings: 'wght' 600;
      line-height: 24px;
    }

    .date {
      font-size: 14px;
      margin: auto;
    }

    .banned > * {
      color: #8a8a97;
    }
  }
</style>
