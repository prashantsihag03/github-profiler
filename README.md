# Github Profiler

An appealing visual of your Github profile that utilised Charts to display additional github statistics.

Built using Next.js, this web app takes a Github username and displays their Github profile with additional information and statistics in a visually appealing way.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Built with:

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Octokit.js](https://github.com/octokit/octokit.js)
- [Chart.js](https://www.chartjs.org/)
- [NextUI](https://nextui.org/)

## Pre-requisite

- Project requires a Github Personal Access Token to fetch data from Github using Github api.
- Create a `.env.local` file at the root of the directory.
- Add `GITHUB_PERSONAL_TOKEN=<your_personal_access_token>` to the `.env.local` file.

## Commands

- Run project in a dev environment
  ```
  npm install;
  npm run dev;
  ```
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
