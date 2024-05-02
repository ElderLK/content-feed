## Tech used

- [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn-ui](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Test

To execute all tests run:

```bash
npm run test
```

## Considerations

- For Backend Efficiency: I could consider caching data when fetching it.
- For Backend Efficiency: I could consider using worker threads or child processes.
- For Backend Efficiency: I could consider utilizing streams when fetching data.
- I opted not to perform any data cleaning as I deemed all the data suitable for transmission to the frontend

## Requirements

- [x] Server side rendering
- [x] Connect to Content API
- [x] Implement data cleaning and transformation processes to return a normalized data structure. (Jest sort data)
- [x] Ensure that your API endpoint in the backend efficiently handles these transformations in a performant way. (Pagination)
- [x] Display the transformed content data in a user-friendly manner
- [x] Ensure the UI is responsive and provides an intuitive user experience
- [x] Content should be sorted by priority, descending.
- [x] Document your API endpoints and their usage.
- [x] Write basic unit tests for both the data processing functions and the API endpoint.

## API

The API folder is located in `/src/app/api`

## Endpoint

`GET /api/feed`
`Folder Location - /src/app/api/feed/route.ts`

## Query Parameters

- `page`: _(optional)_ The page number of the feed. Default is 1.
- `perPage`: _(optional)_ The number of items per page. Default is 100.

## Response

The endpoint responds with a JSON object containing the feed data.

Example response:

```json
[
  {
    "id": "ed9a008c-9756-f9f2-f351-914f2ff31d2c",
    "imageUri": "https://picsum.photos/200/300",
    "textData": {
      "author": { "last": "qJosvtZSoko", "first": "IccYfzYIyuo" },
      "body": "eanisi eu inelit reprehenderit iddolore sunt in euullamcoquis tempor non mollit deseruntUtveniam adipisicingipsum dolore enim dolortempor consecteturquiin Excepteur ametullamco eiusmod ea Lorem ipsumvelitsit eanostrud pariatur dolor voluptateinvoluptateea suntconsequat ut anim laborein et minim incididunt dolordo aliquip anim ipsumculpaUt dolor adipisicing magnaLorem enim sitdolor sunt eaenim exercitation consequat culpaipsumeu irurecupidatat non elitincupidatat esse aliquipaliquip Duis ex veniam esse",
      "title": "officia tempor",
      "subTitle": "dolore no"
    },
    "comments": [
      {
        "likes": 1305827611,
        "profilePic": "https://picsum.photos/200",
        "text": "adipisicing ad incididunt enim",
        "author": "@8fzyvoz1hs"
      },
      {
        "author": "@8t",
        "profilePic": "https://picsum.photos/200",
        "text": "in ea Lorem",
        "likes": 1229906802
      }
    ],
    "metadata": { "publishDate": "1895-04-06T01:39:08.0Z", "priority": 96 }
  }
]
```
