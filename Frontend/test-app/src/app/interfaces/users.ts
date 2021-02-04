export interface Users
{
  data: [{
    id: string;
    name: string;
    created: Date;
    email: string;
  }];
  message: string;
}
