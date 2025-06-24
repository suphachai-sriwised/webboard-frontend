"use client";
import React, { useEffect, useState} from 'react';
import { Post } from './types';
import { createPost, formatTimeAgo, getAllPosts, searchPosts } from './api';

const Board: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    
    const handleSearch = async (query: string) => {
      // Implement search functionality here
      const response = await searchPosts(query);
      console.log("Search response:", response);
      console.log("Search query:", query);
      setPosts(response);
    };


    useEffect(() => {
      const fetchPosts = async () => {
        const allPosts = await getAllPosts();
        console.log("Fetched posts:", allPosts);
        setPosts(allPosts);
      };
      fetchPosts();
    }, []);

  const SearchIcon: React.FC = () => (
    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
    </svg>
  );

  
  const [showModal, setShowModal] = useState(false);
  return (
    
<>
  {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search and Controls */}
          <div className="flex flex-row items-center mb-6">
            <div className="flex basis-5/6 items-center space-x-4">
              <div className="relative w-full mr-4">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-[#BBC2C0] placeholder:text-gray-400 border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <SearchIcon />
              </div>
            </div>
            <div className="flex basis-1/6 items-center space-x-4">
            <select className="font-semibold text-black bg-[#BBC2C0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" defaultValue="Community" onChange={(e) => handleSearch(e.target.value)}>
                <option>Community</option>
                <option>History</option>
                <option>Food</option>
                <option>Pets</option>
                <option>Health</option>
                <option>Fashion</option>
                <option>Exercise</option>
                <option>Others</option>
              </select>
                <button
                className="font-semibold bg-[#49A569] hover:bg-[#3B7A52] text-white px-4 py-2 rounded font-medium transition-colors"
                onClick={() => setShowModal(true)}
                >
                Create +
                </button>
                                {showModal && (
                                <>
                                  <div
                                  className="fixed inset-0 z-40 bg-black opacity-70"
                                  onClick={() => setShowModal(false)}
                                  />
                                  <div className="fixed inset-0 flex items-center justify-center z-50">
                                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                                    <button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                    >
                                    ×
                                    </button>
                                    <h2 className="text-black text-xl font-semibold mb-6">Create Post</h2>
                                    <form
                                    onSubmit={async (e) => {
                                      e.preventDefault();
                                      // Implement create post logic here
                                      await createPost(
                                        e.currentTarget.title.value,
                                        e.currentTarget.content.value,
                                        e.currentTarget.community.value,
                                        JSON.parse(localStorage.getItem('user')).username
                                      );
                                      window.location.reload();
                                      setShowModal(false);
                                    }}
                                    className="space-y-4"
                                    >
                                    <div className="relative">
                                      <select
                                        className="text-gray-600 w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                        name='community'
                                      >
                                        <option value="">Choose a community</option>
                                        <option>Community</option>
                                        <option>History</option>
                                        <option>Food</option>
                                        <option>Pets</option>
                                        <option>Health</option>
                                        <option>Fashion</option>
                                        <option>Exercise</option>
                                        <option>Others</option>
                                      </select>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Title"
                                      name='title'
                                      className="text-gray-600 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                      required
                                    />
                                    <textarea
                                      placeholder="What's on your mind..."
                                      name='content'
                                      className="text-gray-600 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                      rows={8}
                                      required
                                    />
                                    <div className="flex justify-end space-x-3 pt-4">
                                      <button
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="px-6 py-2 bg-[#49A569] hover:bg-[#3B7A52] text-white rounded-lg font-medium transition-colors"
                                    >
                                      Post
                                    </button>
                
                                    </div>
                                    
                                    </form>
                                  </div>
                                  </div>
                                </>
                                )}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img 
                    src={`https://i.pravatar.cc/48?u=${post._id}`} 
                    alt={post.username} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{post.username}</span>
                    <span className="text-gray-500 text-sm">{formatTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
                  <div className="flex-1">
                    <span className="inline-flex items-center px-2 py-0.5 mx-1 my-4 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {post.community}
                    </span>
                    <h3 
                      className="text-black text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => {window.location.href = `/posts/${post._id}`}}
                    >
                      {post.topic}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <span className="hover:text-blue-600 cursor-pointer transition-colors">
                        💬 {post.__v} Comments
                      </span>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </main>

</>
        
  );
};

export default Board;