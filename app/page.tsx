import { getSession } from "@auth0/nextjs-auth0";
export default async function Home() {
  const { user } = await getSession();
  console.log(user);
  return (
    <main>
      <a href="/api/auth/login">Login {user.nickname}</a>
    </main>
  );
}
