import { getSession } from "@auth0/nextjs-auth0";
export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  return (
    <main>
      <a href="/api/auth/login" className="bg-red-400 text-white">
        Login {user?.nickname}
      </a>
    </main>
  );
}
