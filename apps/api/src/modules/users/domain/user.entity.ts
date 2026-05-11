export interface UserPreferences {
  sport?: string
  notifications?: boolean
}

export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly bio: string | null,
    public readonly preferences: UserPreferences | null,
  ) {}
}
