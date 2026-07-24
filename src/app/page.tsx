import { CourseLanding } from "@/components/landing/CourseLanding";
import { subtitleForSource } from "@/data/course";

type Props = {
  searchParams: Promise<{ from?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const subtitle = subtitleForSource(params.from);

  return <CourseLanding subtitle={subtitle} />;
}
