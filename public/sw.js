const CACHE_PREFIX = `sinemaddict-cache`;
const CACHE_VER = `v2`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(precache());
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return fetch(evt.request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== `basic`) {
                return response;
              }
              cache.put(evt.request, response.clone());
              return response;
            })
            .catch(() => {
              return cache.match(evt.request)
                .then((response) => {
                  return response;
                });
            });
        })
  );
});

self.addEventListener(`activate`, (evt) => {

  const cacheWhitelist = [CACHE_NAME];

  evt.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
              return false;
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
};
