import Link from "next/link";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

const ProfileLink = props => (
  <div>
    <Link href={`/p/[profile]`} as={`/p/${props.profile}`}>
      <a>Go To {props.profile}'s profile</a>
    </Link>
  </div>
);

const Index = props => (
  <Layout>
    <p>Friends List</p>
    {props.profiles.map((profile, index) => (
      <ProfileLink key={index} profile={profile} />
    ))}
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await fetch(
    "https://next.json-generator.com/api/json/get/V1UenWj_F"
  );
  const data = await res.json();
  return {
    profiles: data.map(profile => profile.name),
  };
};

export default Index;
