type TurnstileVerifyResponse = {
  success: boolean;
};

function getEnvValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return undefined;
}

export function getTurnstileSiteKey(): string | undefined {
  return getEnvValue(
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_SITE_KEY",
    "NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY",
    "CLOUDFLARE_TURNSTILE_SITE_KEY"
  );
}

export function isTurnstileEnabled(): boolean {
  return Boolean(
    getEnvValue("TURNSTILE_SECRET_KEY", "CLOUDFLARE_TURNSTILE_SECRET_KEY")
  );
}

export async function verifyTurnstileToken(
  token: string,
  ip?: string
): Promise<boolean> {
  const secret = getEnvValue(
    "TURNSTILE_SECRET_KEY",
    "CLOUDFLARE_TURNSTILE_SECRET_KEY"
  );
  if (!secret) return true;

  if (!token.trim()) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) {
    body.append("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );

    if (!response.ok) return false;

    const data = (await response.json()) as TurnstileVerifyResponse;
    return data.success;
  } catch {
    return false;
  }
}
