import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json({ error: 'GITHUB_USERNAME не задан в .env.local' }, { status: 503 });
  }

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const cacheOpts: RequestInit =
    process.env.NODE_ENV === 'development'
      ? { cache: 'no-store', headers }
      : { next: { revalidate: 600 }, headers } as RequestInit;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, cacheOpts),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, cacheOpts)
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();

    if (!Array.isArray(repos)) throw new Error('Не удалось получить репозитории');

    return NextResponse.json({
      repositoriesCount: user.public_repos ?? repos.length,
      followers: user.followers ?? 0,
      totalStars: repos.reduce(
        (sum: number, r: { stargazers_count: number }) => sum + (r.stargazers_count ?? 0),
        0
      )
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Не удалось загрузить данные GitHub', details: String(error) },
      { status: 502 }
    );
  }
}
