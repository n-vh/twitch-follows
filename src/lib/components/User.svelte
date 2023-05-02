<script lang="ts">
  import type { User } from '@/types';
  import { clickOutside } from '@/hooks';
  import { follows, loading } from '@/store';
  import { SkeletonUser } from '@/components';
  import { formatLocalDate } from '@/utils/time';
  import { isValidUsername } from '@/utils/username';

  let showMoreInfo = false;

  const toggleShow = () => {
    showMoreInfo = !showMoreInfo;
  };

  export let user: User;
</script>

{#if $loading && !$follows.follows.length}
  <SkeletonUser />
{:else if user}
  <section class="user">
    <div class="avatar">
      <a class="overlay" href="https://www.twitch.tv/{user.login}" target="_blank">
        <svg class="twitch" width="30" height="30" viewBox="0 0 256 268">
          <path
            d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.886H40.717V23.263zm64.008 116.405H128V69.844h-23.275v69.824zm63.997 0h23.27V69.844h-23.27v69.824z"
          />
        </svg>
      </a>
      <img src={user.avatar} alt=" " />
    </div>
    <div class="info">
      <div class="user-info">
        {#if user.isPartner}
          <svg class="partner" width="20px" height="20px" viewBox="0 0 20 20">
            <path
              d="M10 2l6 2 2 6-2 6-6 2-6-2-2-6 2-6 6-2zM8.889 13.636l5.43-5.429-1.415-1.414-4.015 4.015-2.015-2.015-1.414 1.414 3.429 3.43z"
            />
          </svg>
        {/if}
        <div class="username">
          <span class="display-name">{user.displayName}</span>
          {#if !isValidUsername(user.displayName)}
            <span class="login">({user.login})</span>
          {/if}
        </div>
        <div class="more-info" use:clickOutside on:out={() => (showMoreInfo = false)}>
          {#if showMoreInfo}
            <div class="tooltip">
              <div>
                <span class="custom-icon">ID</span>
                <span>{user.userId}</span>
              </div>
              <div>
                <svg width="16" height="16" viewBox="0 0 448 512">
                  <path
                    d="M448 384c-28.02 0-31.26-32-74.5-32c-43.43 0-46.825 32-74.75 32c-27.695 0-31.454-32-74.75-32c-42.842 0-47.218 32-74.5 32c-28.148 0-31.202-32-74.75-32c-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32c27.951 0 31.253 32 74.75 32c42.843 0 47.217-32 74.5-32c28.148 0 31.201 32 74.75 32c43.357 0 46.767-32 74.75-32c27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32c0-31 32-23 32-64c12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32c0-31 32-23 32-64c12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32c0-31 32-23 32-64c12 0 32 29.5 32 56s-14.25 40-32 40z"
                  />
                </svg>
                <span>{formatLocalDate(user.creationDate)}</span>
              </div>
            </div>
          {/if}
          <button on:click={toggleShow}>
            <svg viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              />
            </svg>
          </button>
        </div>
      </div>
      <span class="follows">{$follows.total} follows</span>
    </div>
  </section>
{/if}

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  .user {
    align-items: center;
    display: flex;
    gap: 14px;
    justify-content: center;

    .avatar {
      border-radius: 50%;
      height: 68px;
      position: relative;
      overflow: hidden;
      width: 68px;

      .overlay {
        align-items: center;
        background-color: #000000a6;
        display: flex;
        height: 100%;
        justify-content: center;
        opacity: 0;
        position: absolute;
        transition: opacity 0.1s;
        width: 100%;

        &:hover {
          opacity: 1;
        }

        svg {
          fill: $icon-color;
        }
      }

      img {
        height: 100%;
        width: 100%;
      }
    }

    span {
      font-size: 18px;
      line-height: 24px;
    }

    .info {
      color: $text-color;

      .user-info {
        align-items: center;
        display: flex;
        font-variation-settings: 'wght' 600;
        position: relative;

        .partner {
          fill: $twitch-color;
          padding-right: 3px;
        }

        .username {
          position: relative;

          .login {
            font-size: 16px;
            font-variation-settings: 'wght' 400;
          }
        }

        .more-info {
          .tooltip {
            background-color: lighten($primary-color, 8%);
            border-radius: 6px;
            cursor: default;
            display: flex;
            flex-direction: column;
            padding: 4px 18px;
            position: absolute;
            transform: translate(calc(-50% + 14px), -105%);

            div {
              align-items: center;
              display: flex;
              gap: 6px;

              span {
                font-size: 13px;
                text-align: center;
                white-space: nowrap;
              }

              svg {
                fill: $icon-color;
              }
            }

            .custom-icon {
              width: 16px;
            }

            &::after {
              content: '';
              background: lighten($primary-color, 8%);
              bottom: -34%;
              left: 48%;
              margin-bottom: 15px;
              padding: 5px;
              position: absolute;
              transform: rotate(45deg);
            }
          }

          button {
            background: transparent;
            border: none;
            cursor: pointer;
            height: 28px;
            padding: 6px;
            width: 28px;

            svg {
              fill: $icon-color;
              height: 16px;
              width: 16px;
            }
          }
        }
      }

      .follows {
        font-size: 16px;
      }
    }
  }
</style>
