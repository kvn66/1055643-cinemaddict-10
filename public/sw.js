const CACHE_PREFIX = `sinemaddict-cache`;
const CACHE_VER = `v2`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener('install', (evt) => {
  evt.waitUntil(precache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== `basic`) {
            return response;
          }
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

const precache = () => {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll([
      `/`,
      `/index.html`,
      `/bundle.js`,
      `/css/normalize.css`,
      `/css/main.css`,
      `/images/background.png`,
      `/images/bitmap.png`,
      `/images/bitmap@2x.png`,
      `/images/bitmap@3x.png`,
      `/images/emoji/angry.png`,
      `/images/emoji/puke.png`,
      `/images/emoji/sleeping.png`,
      `/images/emoji/smile.png`,
      `/images/emoji/trophy.png`,
      `/images/icons/icon-favorite.svg`,
      `/images/icons/icon-favorite-active.svg`,
      `/images/icons/icon-watched.svg`,
      `/images/icons/icon-watched-active.svg`,
      `/images/icons/icon-watchlist.svg`,
      `/images/icons/icon-watchlist-active.svg`,
      `/images/posters/made-for-each-other.png`,
      `/images/posters/popeye-meets-sinbad.png`,
      `/images/posters/sagebrush-trail.jpg`,
      `/images/posters/santa-claus-conquers-the-martians.jpg`,
      `/images/posters/the-dance-of-life.jpg`,
      `/images/posters/the-great-flamarion.jpg`,
      `/images/posters/the-man-with-the-golden-arm.jpg`
    ]);
  });
}
