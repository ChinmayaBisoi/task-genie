# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Live app link  
[Check out the live version here.](https://task-genie.vercel.app/)

## Getting Started?

- Create .env file in the root i.e. same place as the .env.example
- Copy the contents of .env.example into the .env file
- run the following command to install all dependencies
  ```
      npm install
  ```
- NEXTAUTH_URL should be for local development "http://localhost:3000" or your domain name in production
- [Having trouble setting up GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET ?](https://www.youtube.com/watch?v=XmmMQfpQh40&t=446s)
- Now run the following command to start the development server, your app should be running in localhost:3000
``` npm run dev ```
- Friendly note - Always remember to run ``npm run db:push``` after making any changes in the prisma schema, incase of error try starting the development server again


![Dashboard](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/dashboard.png)
![Homepage](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/homepage.png)
![How It Works](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/howitworks.png)
![Members](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/members.png)
![Profile](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/profile.png)
![Project Settiing](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/projectsettings.png)
![Task List](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/tasklist.png)
![Timeline](https://github.com/ChinmayaBisoi/task-genie/blob/master/public/github/timeline.png)




## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
