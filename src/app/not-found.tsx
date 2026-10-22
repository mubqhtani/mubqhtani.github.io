import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-dvh flex-col justify-center py-24">
      <p className="text-[15px] text-muted">404</p>
      <h1 className="section-title mt-2">This page doesn&apos;t exist.</h1>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 w-fit items-center rounded-full bg-fg px-5 text-[15px] font-medium text-white transition-colors hover:bg-accent"
      >
        Back to the home page
      </Link>
    </main>
  );
}
