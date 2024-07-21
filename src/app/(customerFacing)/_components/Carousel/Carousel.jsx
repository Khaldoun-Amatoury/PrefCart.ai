import "./Carousel.css";

export default function Carousel() {
  return (
    <div className="carousel flex overflow-x-auto space-x-16 pl-28 pr-16">
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier5.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier1.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier2.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier3.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier4.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
      <div className="carousel-item flex-none w-fit h-fit">
        <img
          src="/charcutier1.jpeg"
          alt="Burger"
          className="w-56 h-56 rounded-lg"
        />
      </div>
    </div>
  );
}
