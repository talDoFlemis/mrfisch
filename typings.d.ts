export interface CodeInterface {
  id: string;
  user?: UserInterface;
  code_block: string;
  language: string;
  inserted_at: Date;
  updated_at: Date;
  code_title: string;
  description?: string;
  tags?: string[] | null;
  documentation?: string;
  is_public: boolean;
}

export interface UsefulLinkInterface {
  id: number;
  user_id: UserInterface;
  title: string;
  link: string;
  inserted_at: Date;
  updated_at: Date;
}

export interface UserInterface {
  id: string;
  avatar_url: string;
  username: string;
  updated_at: Date;
  is_port: boolean;
  nickname: string;
  is_new: boolean;
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

export interface GithubInterface {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  site_admin: boolean;
  name: string;
  company?: any;
  blog: string;
  location?: any;
  email?: any;
  hireable?: any;
  bio: string;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export interface ModalDataInterface {
  isOpen: boolean;
  data: UsefulLinkModalData;
}

interface UsefulLinkModalData {
  id: number;
  title: string;
  link: string;
}
