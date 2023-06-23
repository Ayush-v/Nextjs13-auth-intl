import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UniForm from "@/components/uniForm";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Link from "next/link";

type UniData = {
  data: UniDataData[];
};
type UniDataData = {
  _id: string;
  name: string;
  subTitle: string;
  image: string;
  active: boolean;
  banner: Array<String>;
  course_type: Array<String>;
  label: string;
  __v: number;
};

const getAllUni = async (session: Session | null): Promise<UniData> => {
  const res = await fetch(
    `${process.env.DATABASE_URL}/uni/getAllUniversity?label=UNI`,
    {
      headers: {
        "x-access-token": session?.user.token as string,
      },
    }
  );

  if (!res.ok) {
    redirect("/signin");
    // throw new Error("Failed to fetch data");
  }

  const response = res.json();

  return response;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const uniData = await getAllUni(session);

  return (
    <main>
      <h1 className="text-6xl">Home Page</h1>
      <Link href="/about">About</Link>
      <Tranas />
      {session?.user && (
        <>
          <div>
            {uniData.data?.map((uni) => (
              <p key={uni._id}>{uni.name}</p>
            ))}
          </div>
          <UniForm session={session} />
        </>
      )}
    </main>
  );
}

function Tranas() {
  const t = useTranslations("Index");
  return <h1 className="text-6xl">{t("title")}</h1>;
}
