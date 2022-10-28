export async function fetchUser(): Promise<User> {
  return fetch('/api/user').then((res) => res.json());
}

export class User {
  constructor(public name: string, public age: number) {}

  async changeName(name: string) {
    this.name = name;
    fetch('/api/user', { method: 'POST', body: JSON.stringify({ name }) });
  }
}

export function isAndroid(ua = '') {
  return ua.indexOf('android') > -1;
}
