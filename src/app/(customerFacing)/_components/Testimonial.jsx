export default function Testimonial() {
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-black hover:text-customRed capitalize lg:text-3xl">
          What our{" "}
          <span className="text-customRed hover:text-black ">clients</span> say
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
          Le charcutier latest feedback
        </p>

        <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
          <div className="p-6 bg-black hover:bg-customRed rounded-lg md:p-8">
            <p className="leading-loose text-white ">
              "Le Charcutier has been my go-to supermarket for years. The
              variety of fresh produce and high-quality meats never disappoints.
              The staff is always friendly and helpful. Highly recommend!"
            </p>

            <div className="flex items-center mt-6">
              <img
                className="object-cover rounded-full w-14 h-14"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="font-semibold text-white">John M.</h1>
                <span className="text-sm text-white">
                  Teacher, Sisal School{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black hover:bg-customRed rounded-lg md:p-8">
            <p className="leading-loose text-white">
              "I love shopping at Le Charcutier. They have an excellent
              selection of gluten-free and lactose-free products, which is
              perfect for my dietary needs. Plus, their prices are unbeatable."
            </p>

            <div className="flex items-center mt-6">
              <img
                className="object-cover rounded-full w-14 h-14"
                src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="font-semibold text-white">Sarah L.</h1>
                <span className="text-sm text-white">
                  Software Developer at Stech
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
