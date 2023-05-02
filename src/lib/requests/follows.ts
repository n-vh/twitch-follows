import fetch from 'cross-fetch';
import { getUsersById } from './users';
import type { Follow } from '@/types';

interface HelixFollow {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
  followed_at: Date;
}

interface FollowResponse {
  total: number;
  data: HelixFollow[];
  pagination: {
    cursor?: string;
  };
}

export async function getFollowedChannels(userId: string, cursor: string) {
  const url = new URL(`${import.meta.env.VITE_API_BASE}/helix/users/follows?`);

  url.searchParams.append('first', '100');
  url.searchParams.append('from_id', userId);
  url.searchParams.append('after', cursor);

  const response = await fetch(url.toString());

  if (response.ok) {
    const data: FollowResponse = await response.json();
    const total = data.total;
    const pagination = data.pagination.cursor;

    const userIds = data.data.map((follow) => follow.to_id);

    const users = await getUsersById(userIds);

    const follows: Follow[] = data.data.map((follow) => {
      const user = users.find((user) => user.userId === follow.to_id);

      return {
        userId: follow.to_id,
        login: follow.to_login,
        displayName: follow.to_name,
        date: follow.followed_at,
        isBanned: user ? false : true,
        ...(user && { avatar: user.avatar }),
        ...(user && { creationDate: user.creationDate }),
        ...(user && { isPartner: user.isPartner }),
      };
    });

    return {
      total,
      follows,
      cursor: pagination || '',
    };
  }

  return false;
}
