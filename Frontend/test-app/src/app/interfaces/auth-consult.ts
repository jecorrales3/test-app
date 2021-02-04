export interface AuthConsult
{
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
