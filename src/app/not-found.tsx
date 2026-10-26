import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-24 text-center lg:py-32">
      <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-24 animate-float" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
        This page has <em className="text-rose-500 italic">fluttered away</em>
      </h1>
      <p className="mt-5 max-w-md text-taupe">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s find you something lovely instead.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop all
        </ButtonLink>
      </div>
    </section>
  );
}
