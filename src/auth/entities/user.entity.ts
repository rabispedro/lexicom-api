import { SignUpDto } from '../dto/sign-up.dto';

export class User {
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(requestBody: SignUpDto, encodedPassword: string) {
    // Generate a UUID-like id with no dashes and truncate to 26 characters
    this.id = crypto.randomUUID().replaceAll('-', '').substring(0, 26);
    this.name = requestBody.name;
    this.email = requestBody.email;
    this.password = encodedPassword;
  }
}
