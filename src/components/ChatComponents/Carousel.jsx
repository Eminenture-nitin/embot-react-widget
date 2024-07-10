import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  pagination = true,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden relative flex w-full h-auto">
      <div
        className="flex w-full h-auto transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-0">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-gray-100 text-gray-800 hover:bg-gray-200 mr-5"
        >
          <Icon icon="mingcute:left-line" className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          <Icon icon="mingcute:right-line" className="w-6 h-6" />
        </button>
      </div>

      {pagination && (
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
