export interface AdminUser {
  adminId: number;
  email: string;
  name: string;
  dob?: string;
  gender?: string;
  root: boolean;
}
