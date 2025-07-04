import { User } from '../constants/types';
const userDataStore = {
  users: [
    { id: "1", email: "test@example.com", name: "John Doe", password: "password" },
  ] as User[]
};
export default userDataStore;