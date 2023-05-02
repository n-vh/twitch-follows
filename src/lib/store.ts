import type { Writable } from 'svelte/store';
import type { Follow, User } from '@/types';
import { writable } from 'svelte/store';

export const follows = (() => {
  type FollowsWritable = {
    total: number;
    follows: Follow[];
    hasNext: boolean;
  };

  const initialState = { total: 0, follows: [], hasNext: false };
  const { set, update, subscribe }: Writable<FollowsWritable> = writable(initialState);

  return {
    reset: () => set(initialState),
    insert: ({ total, follows, hasNext }: FollowsWritable) => {
      update((x) => ({ total, follows: [...x.follows, ...follows], hasNext }));
    },
    subscribe,
  };
})();

export const error = writable(false);
export const filter = writable('');
export const input = writable('');
export const loading = writable(false);
export const user: Writable<User> = writable();
