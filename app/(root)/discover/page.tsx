'use client'

import EmptyState from '@/components/EmptyState'
import LoaderSpiner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import Searchbar from '@/components/Searchbar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Discover = ({ searchParams: { search } }: { searchParams: { search: string } }) => {

  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: search || '' })
  return (
    <div className='flex flex-col gap-9 w-full' >
      <Searchbar />
      {podcastsData ? (
        <div className='flex flex-col gap-9'>
          <h1 className='text-20 font-bold text-white-1'>{!search ? 'Discover Trending Podcast' : 'Search results for: '}{search && <span className='text-orange-1'>{search}</span>} </h1>
          {podcastsData.length > 0 ? (
            <div className='podcast_grid'>
              {podcastsData?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id!}
                />
              ))}
            </div>
          ) : <EmptyState title='No results found' />}
        </div>
      ) : (
        <LoaderSpiner />
      )}
    </div >
  )
}

export default Discover;