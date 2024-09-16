'use client'

import { PodcastCardProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PodcastCard = ({
    imgUrl, title, description, podcastId
}: PodcastCardProps) => {
    const router = useRouter();

    const hanldeViews = () => {

        router.push(`/podcasts/${podcastId}`, {
            scroll: true
        })
    }

    return (
        <div className='cursor-pointer' onClick={hanldeViews}>
            <figure className='flex flex-col gap-2'>
                <Image src={imgUrl} alt={title} width={174} height={174} className='aspect-square h-fit w-full rounded-xl 2xl:size-[250px]' />
                <div className='flex flex-col'>
                    <h1 className='text-white-1 text-16 truncate font-bold'>{title}</h1>
                    <h2 className='text-12 truncate font-normal capitalize text-white-4'>{description}</h2>
                </div>
            </figure>
        </div>
    )
}

export default PodcastCard