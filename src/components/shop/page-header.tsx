import Image from "next/image";
import type { NavLink } from "@/types";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: {
  breadcrumbs: NavLink[];
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-sand-dark bg-sand">
      <div className="container-x grid items-center gap-8 py-10 md:grid-cols-[1.4fr_1fr] lg:py-14">
        <div>
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-5xl leading-[1] font-medium tracking-tight sm:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-xl leading-relaxed text-taupe">{description}</p>}
        </div>
        {image && (
          <div className="relative hidden h-[260px] justify-self-end md:block md:w-[300px] lg:h-[300px] lg:w-[360px]">
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] bg-sand-dark">
              <Image src={image} alt={imageAlt} fill preload sizes="360px" className="object-cover" />
            </div>
            <Image
              src="/brand/butterfly.png"
              alt=""
              width={319}
              height={299}
              className="absolute -top-4 -left-8 w-20 animate-float"
            />
          </div>
        )}
      </div>
    </header>
  );
}
