"use client";

import React, { useState } from "react";
import SlidesData from "../../constants";

const Slider = () => {
    const [current, setCurrent] = useState(0);

    return (
        <div className="h-[calc(100vh-5rem)] relative overflow-hidden">
            <div
                className="w-max h-full flex transition-all ease-in-out duration-1000"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {SlidesData.map((slide) => (
                    <div
                        className="w-screen h-full flex-shrink-0"
                        key={slide.id}
                    >
                        {/* Text container */}
                        <div className="p-4">
                            <h2 className="text-lg">{slide.description}</h2>
                            <h1 className="text-2xl font-bold">{slide.title}</h1>
                            {/* Image container */}
                            <div className="relative w-full h-[50vh]">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;