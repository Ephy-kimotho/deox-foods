function Error404() {
  return (
    <section className="flex-grow grid place-items-center min-h-screen bg-zinc-200 dark:bg-night-200">
      <h2 className="text-red-100 dark:text-orange-200 text-3xl sm:text-4xl md:text-5xl">
        Error 404 can not find the requested page
      </h2>
    </section>
  );
}

export default Error404;
