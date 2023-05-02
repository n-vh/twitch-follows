import fetch from 'cross-fetch';
import type { User } from '@/types';

export interface UserResponse {
  isBanned: boolean;
  userId: string;
  login: string;
  displayName: string;
  description: string;
  color: string;
  avatar: string;
  followsCount: number;
  followersCount: number;
  views: number;
  roles: {
    isPartner: boolean;
    isAffiliate: boolean;
    isSiteAdmin: boolean;
    isStaff: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface HelixUser {
  id: string;
  login: string;
  display_name: string;
  broadcaster_type: string;
  profile_image_url: string;
  created_at: Date;
}

export async function getUserByLogin(login: string): Promise<User | false> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE}/v1/users?login=${login}`);

  if (response.ok) {
    const data: UserResponse[] = await response.json();

    if (data[0]) {
      return {
        userId: data[0].userId.toString(),
        login: data[0].login,
        displayName: data[0].displayName,
        avatar: data[0].avatar,
        creationDate: data[0].createdAt,
        isPartner: data[0].roles.isPartner,
        isBanned: data[0].isBanned,
      };
    }
  }

  return false;
}

export async function getUsersById(userIds: string[]): Promise<User[]> {
  if (!userIds.length) return [];

  const url = `${import.meta.env.VITE_API_BASE}/helix/users?id=${userIds.join('&id=')}`;
  const response = await fetch(url);

  if (response.ok) {
    const { data }: { data: HelixUser[] } = await response.json();

    return data.map((user) => {
      return {
        userId: user.id,
        login: user.login,
        displayName: user.display_name,
        avatar: user.profile_image_url,
        creationDate: user.created_at,
        isPartner: user.broadcaster_type === 'partner',
      };
    });
  }

  return [];
}
