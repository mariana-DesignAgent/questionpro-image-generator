import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Template = {
  id: string;
  title: string;
  description: string;
  available: boolean;
};

const templates: Template[] = [
  {
    id: "feature-announcement",
    title: "Feature Announcement",
    description: "Announce a new product feature for LinkedIn",
    available: true,
  },
  {
    id: "linkedin-carousel",
    title: "LinkedIn Carousel",
    description: "Create a 3-5 slide carousel for LinkedIn",
    available: false,
  },
  {
    id: "data-chart",
    title: "Data Chart",
    description: "Upload a data chart and improve its design",
    available: false,
  },
  {
    id: "quotes",
    title: "Quotes",
    description: "Create a quote card for social media",
    available: false,
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Create images for case study content",
    available: false,
  },
];

export default async function Home() {
  const session = await getServerSession();
  if (!session) redirect("/api/auth/signin");

  return (
    <main className="min-h-screen bg-[#edf2f7]">
      <header className="bg-white border-b border-[#d8e2ef] px-8 py-4 flex items-center justify-between">
        <Image src="/QuestionPro-Mainlogo.svg" alt="QuestionPro" width={140} height={28} className="h-7 w-auto" />
        <div className="flex items-center gap-4">
          <span className="text-[#1b3380] text-sm font-semibold">{session.user?.email}</span>
          <Link
            href="/api/auth/signout"
            className="text-xs text-[#1b87e6] font-bold uppercase tracking-wider hover:underline"
          >
            Sign out
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <p className="text-xs font-extrabold tracking-widest text-[#1b3380] uppercase mb-2">Image Generator</p>
        <h1 className="text-3xl font-extrabold text-[#1b3380] mb-8">Choose a template</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-xl border border-[#d8e2ef] p-6 flex flex-col gap-3 transition-all ${
                t.available
                  ? "hover:border-[#1b87e6] hover:shadow-md cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {t.available ? (
                <Link href={`/${t.id}`} className="flex flex-col gap-3 h-full">
                  <span className="text-[9px] font-extrabold tracking-widest uppercase bg-[#ffe433] text-[#1b3380] px-3 py-1 rounded-sm self-start">
                    Ready
                  </span>
                  <h2 className="text-lg font-extrabold text-[#1b3380]">{t.title}</h2>
                  <p className="text-sm text-[#1b3380] opacity-60 leading-relaxed">{t.description}</p>
                </Link>
              ) : (
                <>
                  <span className="text-[9px] font-extrabold tracking-widest uppercase bg-[#edf2f7] text-[#1b3380] px-3 py-1 rounded-sm self-start">
                    Coming soon
                  </span>
                  <h2 className="text-lg font-extrabold text-[#1b3380]">{t.title}</h2>
                  <p className="text-sm text-[#1b3380] opacity-60 leading-relaxed">{t.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
