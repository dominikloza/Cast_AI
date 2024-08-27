import { Podcast } from 'lucide-react'
import React from 'react'

const PodcastsDetails = ({params}: {params: {podcastId: string}}) => {
  return (
    <p className='text-white-1'>Podcast details for {params.podcastId}</p>
  )
}

export default PodcastsDetails
