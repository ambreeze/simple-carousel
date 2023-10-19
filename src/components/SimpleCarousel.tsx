import { useEffect, useRef, useState } from 'react';
import './SimpleCarousel.css';

interface CarouselProps {
    images: string[];
    interval?: number;
}

const Carousel = ({ images, interval }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalTimer = useRef<ReturnType<typeof setTimeout>>();
    const [isPaused, setIsPaused] = useState(false);
    const [transform, setTransform] = useState(25);

    const handleNext = () => {
        setActiveIndex((prevState) => (prevState + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevState) => (prevState - 1 + images.length) % images.length);
    };

    const handleGoToIndex = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                handleNext();
            } else if (event.key === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (interval && !isPaused) {
            intervalTimer.current = setTimeout(() => {
                handleNext();
            }, interval);
        }
        return () => {
            if (intervalTimer.current) {
                clearTimeout(intervalTimer.current);
            }
        };
    }, [activeIndex, interval, isPaused]);

    useEffect(() => {
        if (activeIndex === 0) {
            setTransform(25);
        } else {
            setTransform(-activeIndex * 50 + 25);
        }
    }, [activeIndex]);

    return (
        <div className='carousel' onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className='carousel-items' style={{ transform: `translateX(${transform}%)` }}>
                {images.map((imageUrl) => (
                    <div key={imageUrl} className='carousel-item' style={{ width: '50%' }}>
                        <img src={imageUrl} />
                    </div>
                ))}
            </div>

            <div>
                {images.map((_, index) => (
                    <button
                        className={`page-indicator ${index === activeIndex && 'active'}`}
                        key={index}
                        onClick={() => handleGoToIndex(index)}
                    ></button>
                ))}
            </div>

            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Carousel;
