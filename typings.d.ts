export interface CodeInterface {
  id: number;
  user: UserInterface;
  code_block: string;
  inserted_at: Date;
  code_title: string;
  description?: any;
  tags?: any;
  is_public: boolean;
}

export interface UserInterface {
  id: string;
  avatar_url: string;
  username: string;
  updated_at: Date;
  role: string;
}

export interface IdentityData {
  sub: string;
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuthInterface {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: Date;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
}
