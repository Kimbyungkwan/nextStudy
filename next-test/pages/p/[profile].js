import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  return (
    <Layout>
      <p>Hello, my name is {router.query.profile}. I use Next.js</p>
    </Layout>
  );
}
