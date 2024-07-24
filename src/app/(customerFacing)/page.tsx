import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Feedback, Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import Hero from "./_components/Hero";
import Carousel from "./_components/Carousel/Carousel";
import OpeningTimes from "./_components/OpeningTimes/OpeningTimes";
import Testimonial from "./_components/Testimonial";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import { FeedbackCard } from "@/components/FeedbackCard";
import FeedbackList from "./_components/FeedbackList";

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

export default function HomePage() {
  return (
    <main className="space-y-12 bg-white ">
      <div className="space-y-12 pr-5 pl-5">
        <Hero />
        <Carousel />
        <OpeningTimes />
        {/* <Testimonial /> */}
        <FeedbackList />
        <Contact />
        <ProductGridSection
          title="Newest"
          productsFetcher={getNewestProducts}
        />
      </div>
      <Footer />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4 pl-24">
      <div className="flex gap-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
