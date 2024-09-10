import { VoiceType } from "@/types";

export const sidebarLinks = [
    {
        imgUrl: "/icons/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgUrl: "/icons/discover.svg",
        route: "/discover",
        label: "Discover",
    },
    {
        imgUrl: "/icons/microphone.svg",
        route: "/create-podcast",
        label: "Create Podcast",
    },
];

export const voiceDetails: VoiceType[] = [
    {
        provider: "Unreal Speech",
        voices: ["Scarlett", "Dan"],
    },
    {
        provider: "Eleven Labs",
        voices: ["Rachel", "Drew"],
    },
    {
        provider: "Openai",
        voices: ["alloy", "echo", "fable", "onyx", "nova", "shimmer"],
    },
];

export const podcastData = [
    {
        _id: 1,
        podcastTitle: "The Joe Rogan Experience",
        podcastDescription: "A long form, in-depth conversation",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/3106b884-548d-4ba0-a179-785901f69806",
    },
    {
        _id: 2,
        podcastTitle: "The Futur",
        podcastDescription: "This is how the news should sound",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/16fbf9bd-d800-42bc-ac95-d5a586447bf6",
    },
    {
        _id: 3,
        podcastTitle: "Waveform",
        podcastDescription: "Join Michelle Obama in conversation",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/60f0c1d9-f2ac-4a96-9178-f01d78fa3733",
    },
    {
        _id: 4,
        podcastTitle: "The Tech Talks Daily Podcast",
        podcastDescription: "This is how the news should sound",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/5ba7ed1b-88b4-4c32-8d71-270f1c502445",
    },
    {
        _id: 5,
        podcastTitle: "GaryVee Audio Experience",
        podcastDescription: "A long form, in-depth conversation",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/ca7cb1a6-4919-4b2c-a73e-279a79ac6d23",
    },
    {
        _id: 6,
        podcastTitle: "Syntax ",
        podcastDescription: "Join Michelle Obama in conversation",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/b8ea40c7-aafb-401a-9129-73c515a73ab5",
    },
    {
        _id: 7,
        podcastTitle: "IMPAULSIVE",
        podcastDescription: "A long form, in-depth conversation",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/8a55d662-fe3f-4bcf-b78b-3b2f3d3def5c",
    },
    {
        _id: 8,
        podcastTitle: "Ted Tech",
        podcastDescription: "This is how the news should sound",
        imgUrl:
            "https://lovely-flamingo-139.convex.cloud/api/storage/221ee4bd-435f-42c3-8e98-4a001e0d806e",
    },
];