<div align="center">
  <img src="public/favicon.svg" width="128" alt="">
  <h1>SeasonalItaly</h1>
  <p>Which fruit and vegetables are in season in Italy, month by month.</p>
</div>

Open the [site](https://archetipico.github.io/SeasonalItaly/) to see what is in season this month. Search any entry and read its peak months, its shoulder months and whether it is imported. The text of the site is in Italian.

The site is free, needs no account and makes no network call beyond loading its own files.

## Contribute

- A new entry goes in [seasonal.ts](src/data/seasonal.ts), sorted by name. If `NATIONAL_CALENDAR` does not name it, mark it `isImported` or add it to `OUTSIDE_CALENDAR` in [seasonal.test.ts](src/data/seasonal.test.ts).
- Product text and data are in Italian, everything else in English.
- Every declaration carries a doc comment, and each test sits beside the file it tests.
- A shipped dependency needs a row in `build/licenseNotices.ts`.

## Licence

[MIT](LICENSE).
