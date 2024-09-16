'use client'

import React, { useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import { CarouselProps } from '@/types'
import Image from 'next/image'
import LoaderSpiner from './LoaderSpinner'

const EmblaCarousel = ({ fansLikeDetail }: CarouselProps) => {
    const router = useRouter();

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplayF
        if (!autoplay || !("stopOnInteraction" in autoplay.options)) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset as () => void
                : autoplay.stop as () => void

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    const slides = fansLikeDetail && fansLikeDetail?.filter((item: any) => item.totalPodcasts > 0)

    if (!slides) return <LoaderSpiner />

    return (
        <section className="flex w-full flex-col gap-4 overflow-hidden" ref={emblaRef}>
            <div className='flex carousel_container'>
                {slides.slice(0, 5).map((item) => (
                    <figure key={item._id} className='carousel_box relative' onClick={() => router.push(`/podcasts/${item.podcast[0]?.podcastId}`)}>
                        <div className='relative w-full aspect-square'>
                            <Image src={item.imageUrl} alt='card' fill objectFit='cover' className='rounded-xl border-none block' />
                            <div className='glassmorphism-black absolute w-full z-10 flex flex-col rounded-b-xl p-4 bottom-0'>
                                <h2 className='text-14 font-semibold text-white-1'>{item.podcast[0]?.podcastTitle}</h2>
                                <p className='text-12 font-normal text-white-2'>{item.name}</p>
                            </div>
                        </div>
                    </figure>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        selected={index === selectedIndex}
                    />
                ))}
            </div>
        </section>
    )
}

export default EmblaCarousel
