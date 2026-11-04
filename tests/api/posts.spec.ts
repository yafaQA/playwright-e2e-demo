import { expect, test } from '@playwright/test';

// API tests against JSONPlaceholder, a free fake REST API.
// Note: it fakes writes (POST/PUT/DELETE return realistic responses but persist nothing).
test.describe('Posts API', () => {
  test('GET /posts returns a list of 100 posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts).toHaveLength(100);
  });

  test('GET /posts/1 returns the expected shape', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts/9999 returns 404', async ({ request }) => {
    const response = await request.get('/posts/9999');
    expect(response.status()).toBe(404);
  });

  test('POST /posts creates a post and echoes the payload', async ({ request }) => {
    const payload = { title: 'QA demo', body: 'Created by a Playwright API test', userId: 1 };
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('GET /posts?userId=1 filters by user', async ({ request }) => {
    const response = await request.get('/posts', { params: { userId: 1 } });
    const posts: Array<{ userId: number }> = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 1)).toBe(true);
  });
});
