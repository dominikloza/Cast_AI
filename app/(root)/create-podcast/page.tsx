"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { voiceDetails } from "@/constants"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"



const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

const CreatePodcast = () => {
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageUrl, setimageUrl] = useState('');

  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState({ voice: "", provider: "" });
  const [voicePrompt, setVoicePrompt] = useState('');

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const {toast} = useToast();

  const createPodcast = useMutation(api.podcasts.createPodcast);
 
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {

    try {
      setIsSubmiting(true);
      if(!audioUrl || !imageUrl || !voiceType ) {
        toast({
          title: "Failed to create podcast",
          description: "Please try again",
          variant: "destructive",
        })
        setIsSubmiting(false);
        throw new Error('Please generate audio and image');
      }
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        voiceType: voiceType.voice,
        voicePrompt,
        audioUrl,
        audioStorageId: audioStorageId!,
        audioDuration,
        imagePrompt,
        views: 0,
        imageUrl,
        imageStorageId: imageStorageId!,
      });
      toast({
        title: "Podcast created successfully",
        description: "Your podcast has been created successfully",
      });
      setIsSubmiting(false);
      router.push(`/`);

    } catch (error) {
      console.log(error);
      toast({title: 'Error when uploading a podcast', variant: 'destructive'});
      setIsSubmiting(false);
    }
  }
  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Your Own Podcast!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col w-full">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 text-white-1 font-bold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your Podcast" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => {
                const voice = value.split("--")[0];
                const provider = value.split("--")[1];
                setVoiceType({ voice, provider });
              }}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1" />
                </SelectTrigger>
                <SelectContent className="bg-black-1 text-16 text-white-1 font-bold focus:ring-offset-orange-1 border-none">
                  {voiceDetails.map((voice) => (
                    <SelectGroup key={voice.provider}>
                      <SelectLabel className="text-white-3 font-light pl-4">
                        {voice.provider}
                      </SelectLabel>
                      {voice.voices.map((voiceName) => (
                        <SelectItem
                          key={voiceName}
                          value={`${voiceName}--${voice.provider}`}
                          className="capitalize focus:bg-orange-1"
                        >
                          {voiceName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
                {voiceType.voice && (
                  <audio
                    src={`/${voiceType.voice}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 text-white-1 font-bold">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a short description..." {...field} className="input-class focus-visible:ring-offset-orange-1" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudioUrl={setAudioUrl}
              setAudioDuration={setAudioDuration}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              voiceType={voiceType.voice}
              voiceProvider={voiceType.provider}
              audioUrl={audioUrl}
            />
            <GenerateThumbnail
              setImage={setimageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            <div className="mt-10 w-full">
              <Button type="submit" className="text-16 w-full bg-orange-1 text-white-1 py-4 font-extrabold transition-all duration-500 hover:bg-black-4">
                {isSubmiting ? (
                  <>
                    Generating Your Podcast
                    <Loader size={20} className="animate-spin ml-2"
                    />
                  </>
                ) : (
                  'Submit & Publish Podcast'
                )
                }</Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast;