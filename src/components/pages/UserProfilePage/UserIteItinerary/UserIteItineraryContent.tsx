"use client";
import React, { useState } from "react";
import { Calendar, Star, Train, Car, Plane, Ship } from "lucide-react";
import { IPost } from "@/types/post.types";
import { IItinerary } from "@/types/itinerary.types";
import ShowItineraryModal from "../../home/create-post/ShowItineraryModal";
import moment from "moment";

interface UserIteItineraryContentProps {
  post: IPost;
}

const UserIteItineraryContent: React.FC<UserIteItineraryContentProps> = ({
  post,
}) => {
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const itinerary: IItinerary = post?.itinerary;

  if (!itinerary) return null;

  const getTravelModeIcon = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case "train":
        return <Train className="w-4 h-4" />;
      case "car":
        return <Car className="w-4 h-4" />;
      case "plane":
        return <Plane className="w-4 h-4" />;
      case "ship":
        return <Ship className="w-4 h-4" />;
      default:
        return <Train className="w-4 h-4" />;
    }
  };

  const handleContentClick = () => {
    setShowItineraryModal(true);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-6 cursor-pointer  transition-shadow duration-300 border border-gray-200"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {itinerary.tripName}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {getTravelModeIcon(itinerary.travelMode)}
              <span className="capitalize">{itinerary.travelMode}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{moment(itinerary.createdAt).format("MMM DD, YYYY")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{itinerary.overAllRating}/5</span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">From</p>
              <p className="font-semibold text-gray-800">
                {itinerary.departure}
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="mx-2 p-1 bg-blue-100 rounded-full">
                {getTravelModeIcon(itinerary.travelMode)}
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">To</p>
              <p className="font-semibold text-gray-800">{itinerary.arrival}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Click to view full itinerary</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            PDF View Available
          </span>
        </div>
      </div>

      <ShowItineraryModal
        visible={showItineraryModal}
        onClose={() => setShowItineraryModal(false)}
        itinerary={itinerary as IItinerary}
      />
    </>
  );
};

export default UserIteItineraryContent;
