<script lang="ts">
  import Avatar from './Follows/Avatar.svelte';
  import Info from './Follows/Info.svelte';

  import { filter, follows, loading, user } from '@/store';
  import { Error, SkeletonCard, SkeletonFollows } from '@/components';

  $: filteredFollows = $follows.follows.filter((channel) => {
    const regex = new RegExp($filter, 'i');
    return regex.test(channel.login) || regex.test(channel.displayName);
  });
</script>

<svelte:head>
  {#if $user}
    <title>{$user.displayName} – Follows</title>
  {/if}
</svelte:head>

{#if $follows.total}
  <section class="follows">
    {#if filteredFollows.length}
      {#each filteredFollows as follow (follow.userId)}
        <div class="card">
          <Avatar {follow} />
          <Info {follow} />
        </div>
      {/each}
      {#if $follows.hasNext}
        <SkeletonCard />
      {/if}
    {:else if $follows.total}
      <Error />
    {/if}
  </section>
{:else if $loading}
  <SkeletonFollows>
    <SkeletonCard />
  </SkeletonFollows>
{/if}

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  section {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 0fr));
    justify-content: center;

    .card {
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.2s;
      width: 240px;

      &:hover {
        transform: scale(105%);
      }
    }
  }
</style>
