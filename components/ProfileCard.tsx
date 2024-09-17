"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import LoaderSpiner from "./LoaderSpinner";
import { PodcastProps, ProfileCardProps } from "@/types";
import { useAudio } from "@/providers/AudioProvider";
import { useEffect, useState } from "react";

const ProfileCard = ({
    userFirstName,
    imageUrl,
    podcastData,
}: ProfileCardProps) => {
    const { setAudio } = useAudio();
    const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);


    const playRandomPodcast = () => {
        const randomIndex = Math.floor(Math.random() * podcastData.podcasts.length);
        setRandomPodcast(podcastData.podcasts[randomIndex])
    }

    useEffect(() => {
        if (randomPodcast) {
            setAudio({
                title: randomPodcast.podcastTitle,
                audioUrl: randomPodcast.audioUrl || "",
                imageUrl: randomPodcast.imageUrl || "",
                author: randomPodcast.author,
                podcastId: randomPodcast._id,
            });
        }
    }, [randomPodcast, setAudio])


    if (!imageUrl || !podcastData) return <LoaderSpiner />;

    return (
        <div className="mt-6 flex w-full justify-between max-md:justify-center">
            <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
                <Image
                    src={imageUrl}
                    width={250}
                    height={250}
                    alt="Podcast image"
                    className="aspect-square rounded-lg"
                />
                <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
                    <article className="flex flex-col gap-2 max-md:items-center">
                        <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
                            {userFirstName}
                        </h1>
                        <figure className="flex gap-2 items-center">
                            <Image
                                src="/icons/headphone.svg"
                                width={24}
                                height={24}
                                alt="headphone"
                            />
                            <h2 className="text-16 font-bold text-white-1">{podcastData.listeners}</h2>
                            <span className="text-white-2 text-14 font-bold text-16">total listeners</span>
                        </figure>
                    </article>

                    <Button
                        className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
                        onClick={playRandomPodcast}
                    >
                        <Image
                            src="/icons/Play.svg"
                            width={20}
                            height={20}
                            alt="random play"
                        />{" "}
                        &nbsp; Play random podcast
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;