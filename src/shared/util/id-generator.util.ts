export class IdGenerator {
  static generate(limit: number = 26): string {
    // Generate a UUID-like id with no dashes and truncate to 26 characters
    return crypto.randomUUID().replaceAll('-', '').substring(0, limit);
  }
}
