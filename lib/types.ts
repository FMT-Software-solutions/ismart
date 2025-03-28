export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  is_first_login: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminCreateUserRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface AdminUpdateUserRequest {
  id: string;
  email?: string;
  full_name?: string;
  is_first_login?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  event_id: string;
  user_id: string;
  status: 'registered' | 'attended' | 'cancelled';
  created_at: string;
  updated_at: string;
}
