'use client';
import React from 'react';
import MyGroupCard from './my-group-card';
// Define the interface for the group data
interface Group {
  id: number;
  name: string;
  image: string;
  members: string;
}

// Demo data with Unsplash images
const demoGroups: Group[] = [
  {
    id: 1,
    name: 'World Trip Community',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60', // Beach landscape
    members: '1.1K',
  },
  {
    id: 2,
    name: 'World Trip Community',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60', // Mountain landscape
    members: '1.1K',
  },
  {
    id: 3,
    name: 'World Trip Community',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60', // Ocean landscape
    members: '1.1K',
  },
];

const MyGroups: React.FC = () => {
  return (
    <section className="w-full pt-2 pb-7 border-b-2">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">My Groups</h1>
        <button className="text-primary hover:underline">Show more</button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {demoGroups.map((group) => (
          <MyGroupCard
            key={group.id}
            name={group.name}
            image={group.image}
            members={group.members}
          />
        ))}
      </div>
    </section>
  );
};

export default MyGroups;