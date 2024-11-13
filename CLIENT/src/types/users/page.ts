export interface UserProfile {
  user_id: string; // uuid string
  username: string; // username like "pepito"
  name: string; // full name like "jhonattan Escorihuela"
  email: string; // must be a valid email format
  password: string; // password with a minimum length of 8 characters
  role: "admin" | "user"; // role can be either "admin" or "user"
  status: "enabled" | "blocked" | "deleted"; // status of the account
  avatar?: string; // optional URL or filename for profile picture
  created_at: string; // date-time string format (ISO 8601)
  updated_at: string; // date-time string format (ISO 8601)
}
