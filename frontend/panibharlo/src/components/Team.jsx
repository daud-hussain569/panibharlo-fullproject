// src/components/Team.jsx
import React from "react";

const teamMembers = [
  { name: "Christian Bale", role: "CEO & Founder" },
  { name: "Hard Branots", role: "Designer" },
  { name: "Monica Bana", role: "Manager" },
];

export default function Team() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6">
              {/* Image placeholder */}
              <div className="w-32 h-32 mx-auto rounded-full bg-blue-200 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">IMG</span>
              </div>

              <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
              <span className="text-gray-500">{member.role}</span>

              {/* Social icons placeholder */}
              <div className="flex justify-center mt-4 space-x-3">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold">F</div>
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold">T</div>
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold">G</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
