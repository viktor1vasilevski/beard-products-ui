export class UserDetailsModel {
    public username: string | null;
    public role: string | null;
    public showDataStatus: boolean;
    public token: string | null;
    public userId: string | null;
  
    constructor(username: string, role: string, showDataStatus: boolean, token: string, userId: string) {
      this.username = username;
      this.role = role;
      this.showDataStatus = showDataStatus;
      this.token = token;
      this.userId = userId;
    }
}