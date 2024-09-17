'use client'

import EmptyState from '@/components/EmptyState'
import LoaderSpiner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import ProfileCard from '@/components/ProfileCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const Profile = ({ params: { authorId } }: { params: { authorId: string } }) => {
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId });
  const authorDetails = useQuery(api.users.getUserById, { clerkId: authorId });

  if (!authorDetails || !podcastsData) return <LoaderSpiner />;
  return (
    <section>
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">
          Podcaster Profile
        </h1>
      </header>
      <ProfileCard
        userFirstName={authorDetails?.name!}
        imageUrl={authorDetails?.imageUrl!}
        podcastData={podcastsData!} />
      <section className='flex flex-col gap-5 mt-10 '>
        <h1 className='text-20 font-bold text-white-1'>{``}</h1>
        {podcastsData.podcasts.length > 0 ? (
          <>
            <h2 className="text-16 font-bold text-white-1">{`${authorDetails?.name} podcasts`}</h2>
            <div className='podcast_grid'>
              {podcastsData.podcasts.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id!}
                />
              ))}
            </div>
          </>
        ) : <EmptyState title='Author has no podcast' />}
      </section>
    </section>
  )
}

export default Profile