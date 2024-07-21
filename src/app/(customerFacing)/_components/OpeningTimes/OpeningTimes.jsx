import "./OpeningTimes.css";

const stats = [
  { id: 1, name: "Monday", value: "8:00 AM - 10:00 PM" },
  { id: 2, name: "Tuesday", value: "8:00 AM - 10:00 PM" },
  { id: 3, name: "Wendesday", value: "8:00 AM - 10:00 PM" },
  { id: 4, name: "Thursday", value: "8:00 AM - 10:00 PM" },
  { id: 5, name: "Friday", value: "8:00 AM - 10:00 PM" },
  { id: 6, name: "Saturday", value: "9:00 AM - 7:00 PM" },
  { id: 7, name: "Sunday", value: "9:00 AM - 5:00 PM" },
];

export default function OpeningTimes() {
  return (
    <div className="bg-white py-12 sm:py-16 overflow-x-auto scrollbar">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex">
          <dl className="flex gap-x-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`flex-shrink-0 ${
                  index === stats.length - 1 ? "mr-7" : ""
                }`}
              >
                <dt className="text-xl font-semibold tracking-tight text-gray-900 hover:text-customRed sm:text-xl pb-4">
                  {stat.name}
                </dt>
                <dd className="text-base leading-7 text-gray-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
