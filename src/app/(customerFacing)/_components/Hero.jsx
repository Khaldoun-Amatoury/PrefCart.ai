export default function Hero() {
  return (
    <header className="bg-white">
      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
          <div className="max-w-lg lg:mx-12 lg:order-2">
            <h1 className="text-5xl font-bold tracking-wide text-black hover:text-customRed lg:text-6xl">
              Le Charcutier
            </h1>
            <div className="">
              <p className="text-lg mt-4 text-black">
                Le Charcutier is a 100% Lebanese owned family business. Le
                Charcutier started as a small grocery store in Ashrafieh back in
                1953. Throughout the years, it grew into 19 branches across
                Lebanon, with an extended family of 1700 individuals.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <img
            className="object-cover w-full h-full max-w-2xl rounded-md"
            src="\charcutier-750x420.jpg"
            alt="le charcutier outdoor photo"
          />
        </div>
      </div>
    </header>
  );
}
