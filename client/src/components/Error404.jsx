import custom404Video from "/404_Error.mp4";

function Error404() {
  return (
    <section className="flex-grow grid place-items-center min-h-screen bg-zinc-200 dark:bg-night-200">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-red-100 font-bold dark:text-orange-200 text-2xl sm:text-4xl md:text-5xl text-center">
          Error 404 <br /> Can  not find the requested page
        </h2>
        <video
          src={custom404Video}
          autoPlay
          muted
          loop
          className="w-52 rounded-md"
        />
      </div>
    </section>
  );
}

export default Error404;
