<script lang="ts">
  import type { Context } from 'page';
  import router from 'page';
  import { getUserByLogin } from '@/requests/users';
  import { getFollowedChannels } from '@/requests/follows';
  import { error, filter, follows, input, loading, user } from '@/store';
  import { Error, Filter, Follows, Header, ScrollTop, User, Warning } from '@/components';

  const resetAllValues = (param: string, query: string) => {
    error.set(false);
    filter.set(query);
    follows.reset();
    input.set(param);
    loading.set(true);
    window.scrollTo(0, 0);
  };

  router('/:username', async ({ params: { username }, querystring }: Context) => {
    const query = new URLSearchParams(querystring).get('filter') || '';
    resetAllValues(username, query);

    const channel = await getUserByLogin(username);

    if (channel) {
      user.set(channel);
      let cursor: string = '';

      do {
        const result = await getFollowedChannels(channel.userId, cursor);
        if (result) {
          cursor = result.cursor;
          follows.insert({
            total: result.total,
            follows: result.follows,
            hasNext: !!cursor.length,
          });
          loading.set(true);
        }
      } while (cursor.length);
    } else {
      error.set(true);
    }

    loading.set(false);
  });

  router.start();
</script>

<Header />
{#if $error}
  <Error />
{:else}
  <User user={$user} />
  {#if $user && $user.isBanned}
    <Warning />
  {/if}
  <Filter />
  <Follows />
{/if}
<ScrollTop />
