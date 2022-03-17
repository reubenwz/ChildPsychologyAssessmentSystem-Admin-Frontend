import { AdminUser } from '../../models/admin-user';

export interface LoginTokenResponse {
  token: string;
  token_expiry?: string;
  role: string;
  user: AdminUser;
}
