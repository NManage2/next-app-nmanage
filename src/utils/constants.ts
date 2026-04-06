export const POST_PER_PAGE = 6;
//export const DOMAIN = 'http://localhost:3000/';
export const DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://next-app-nmanage-dgwvb9223-nmanage2s-projects.vercel.app'
    : 'http://localhost:3000';
