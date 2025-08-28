import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Clean Water Matters",
      excerpt: "Access to clean water is essential for health, development, and well-being. Learn why it matters more than ever.",
      image: "https://via.placeholder.com/400x250",
      link: "#"
    },
    {
      id: 2,
      title: "How We Ensure Water Quality",
      excerpt: "Discover the processes we use to filter and deliver safe water to your home and business.",
      image: "https://via.placeholder.com/400x250",
      link: "#"
    },
    {
      id: 3,
      title: "Smart Ways to Save Water",
      excerpt: "Practical tips for saving water at home and reducing your environmental footprint.",
      image: "https://via.placeholder.com/400x250",
      link: "#"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="blog">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600">
            Stay updated with our insights, tips, and news about water solutions.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
