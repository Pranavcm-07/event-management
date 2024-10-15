import Category from "@/components/shared/Category";
import Collections from "@/components/shared/Collections";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({searchParams}:SearchParamProps) {
  const searchFilter = searchParams?.query as string || ''
  const page = Number(searchParams?.page) || 1
  const category = searchParams?.category as string || ''
  const events = await getAllEvents({ query: searchFilter , category, limit: 4, page });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
            Empower, Shine, Connect, Thrive: Elevate Your Events with Us!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
            Discover insights and strategies from 4000+ top experts. Create unforgettable experiences with our innovative platform and global network.
            </p>
            <Button size='lg' asChild className="button w-full sm:w-fit">
              <Link href='/'>
                Explore Now
              </Link>
            </Button>
          </div>
          <Image src='/assets/images/event-planning-flat-composition-with-view-doodle-coworkers-team-ideas-trophy-cup-chat-bubble-vector-illustration.png' width={1000} height={1000} alt='Hero Image' className="object-center max-h-[70vh] object-contain 2xl:max-h-[50vh]"/>
        </div>
      </section>
      <section id="events" className="wrapper flex flex-col gap-8 md:gap-12 my-8">
        <h2 className="h2-bold">
          Search Away, <br /> Your Perfect Event Awaits
        </h2>
        <div className="flex col md:flex-row gap-5 w-full">
          <Search />
          <Category /> 
        </div>
        <Collections
          data={events?.data}
          emptyTitle="No events found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
