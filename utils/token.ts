export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return payload.exp < now;
  } catch (err) {
    return true; // Treat as expired if token is invalid
  }
}
