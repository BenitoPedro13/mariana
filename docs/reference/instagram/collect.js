// Collects every post on an Instagram profile: bio, full captions, dates,
// every carousel slide, and reel covers. Downloads the images plus one JSON file.
//
// Use: open https://www.instagram.com/anairamodarnoc/ while logged in,
// open DevTools → Console, paste this whole file, press Enter.
// Chrome asks once to allow multiple downloads. Allow it.
//
// It reads the same endpoints the Instagram web app calls for a logged-in
// visitor, so it only sees what your account can already see.

(async () => {
  const username = location.pathname.split('/').filter(Boolean)[0];
  const headers = { 'x-ig-app-id': '936619743392459' };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n) => String(n).padStart(3, '0');

  const getJSON = async (url) => {
    const res = await fetch(url, { headers, credentials: 'include' });
    if (!res.ok) throw new Error(`${res.status} on ${url}`);
    return res.json();
  };

  const largest = (candidates = []) =>
    [...candidates].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;

  // 1. Profile and bio.
  const { data } = await getJSON(`/api/v1/users/web_profile_info/?username=${username}`);
  const user = data.user;
  const profile = {
    username: user.username,
    full_name: user.full_name,
    biography: user.biography,
    external_url: user.external_url,
    followers: user.edge_followed_by?.count,
    following: user.edge_follow?.count,
    post_count: user.edge_owner_to_timeline_media?.count,
    profile_pic: user.profile_pic_url_hd,
  };
  console.log('profile', profile);

  // 2. Every post, 12 at a time.
  const posts = [];
  let maxId = '';
  do {
    const page = await getJSON(
      `/api/v1/feed/user/${user.id}/?count=12${maxId ? `&max_id=${maxId}` : ''}`,
    );
    for (const item of page.items) {
      const slides = item.carousel_media ?? [item];
      posts.push({
        code: item.code,
        link: `https://www.instagram.com/p/${item.code}/`,
        type: item.product_type, // feed | carousel_container | clips
        taken_at: new Date(item.taken_at * 1000).toISOString(),
        caption: item.caption?.text ?? '',
        location: item.location?.name ?? null,
        likes: item.like_count,
        images: slides.map((s) => ({
          url: largest(s.image_versions2?.candidates),
          width: s.original_width,
          height: s.original_height,
          alt: s.accessibility_caption ?? null,
          is_video: s.media_type === 2,
        })),
      });
    }
    console.log(`posts: ${posts.length} / ${profile.post_count}`);
    maxId = page.more_available ? page.next_max_id : '';
    await sleep(900);
  } while (maxId);

  // 3. Save the JSON.
  const save = (blob, name) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };
  save(
    new Blob([JSON.stringify({ profile, posts }, null, 2)], { type: 'application/json' }),
    `${username}_full.json`,
  );

  // 4. Save every image, oldest post = 001.
  const ordered = [...posts].reverse();
  for (const [i, post] of ordered.entries()) {
    for (const [j, img] of post.images.entries()) {
      if (!img.url) continue;
      try {
        const blob = await (await fetch(img.url)).blob();
        save(blob, `${username}_${pad(i + 1)}_${j + 1}.jpg`);
      } catch (err) {
        console.warn('skipped', post.link, err);
      }
      await sleep(350);
    }
  }
  console.log(`done: ${ordered.length} posts saved`);
})();
