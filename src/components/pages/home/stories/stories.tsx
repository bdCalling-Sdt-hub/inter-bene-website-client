"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StoryCard from "./stories.card";
import { useGetFeedStoriesQuery } from "@/redux/features/stories/storiesApi";
import { IStory } from "@/types/stories.types";

const Stories = () => {
  const {
    data: storiesData
  } = useGetFeedStoriesQuery(undefined);
  const router = useRouter();
  const [stories, setStories] = useState<IStory[]>([]);

  useEffect(() => {
    if (storiesData?.data?.attributes?.results) {
      setStories(storiesData?.data?.attributes?.results)
    }
  }, [storiesData]);

  const handleAddJourney = () => {
    router.push("/stories");
  };

  const handleStoryClick = (storyId: number | string) => {
    router.push(`/story/${storyId}`);
  };


  return (
    <section className="w-full">
      <Swiper
        slidesPerView={2.5}
        breakpoints={{
          640: { slidesPerView: 3.5, spaceBetween: 16 },
          768: { slidesPerView: 3.5, spaceBetween: 16 },
          1024: { slidesPerView: 4.5, spaceBetween: 16 },
          1280: { slidesPerView: 4.5, spaceBetween: 16 },
        }}
        spaceBetween={8}
        freeMode={true}
        pagination={{ clickable: true, el: null }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="relative w-full h-[240px] md:h-[260px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={handleAddJourney}
          >
            <Image
              src="https://i.postimg.cc/dVP9Fh3N/2588a7b47b42d6dddfdfa08bb9300d00.jpg"
              alt="Add Journey"
              width={200}
              height={380}
              className="object-cover w-full h-full rounded-xl"
            />
            <div className="absolute p-4 rounded-xl top-0 left-0 right-0 bottom-0 bg-white/30 flex flex-col justify-end">
              <div className="flex flex-col items-center gap-5">
                <div className="size-10 bg-white flex justify-center items-center rounded-2xl">
                  <Plus size={20} className="text-gray-950 font-bold" />
                </div>
                <h1 className="text-white text-sm font-semibold">
                  Add Journey
                </h1>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {stories?.map((story) => (
          <SwiperSlide key={story._id}>
            <div onClick={() => handleStoryClick(story._id)}>
              <StoryCard
                image={story?.mediaIds[0]?.mediaUrl}
                mediaType={story?.mediaIds[0]?.mediaType}
                authorName={story?.userId?.username}
                authorImage={story?.userId?.profileImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Stories;
