"use client";
import React, { useEffect, useState, useContext, use } from 'react';
import {useRouter} from 'next/navigation';
import { Post } from '../types';
import { createPost, editPost, formatTimeAgo, searchPosts } from '../api';
import { create } from 'domain';

const Board: React.FC = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        alert("You must signin before");
        router.push("/");
        return;
      }

      const fetchPosts = async () => {
        const userData = JSON.parse(user);
        const allPosts = await searchPosts(userData.username);
        console.log("Fetched posts:", allPosts);
        setPosts(allPosts);
      };
      fetchPosts();
    }, [posts, router]);
    
    const handleSearch = async (query: string) => {
      // Implement search functionality here
      const response = await searchPosts(query);
      console.log("Search response:", response);
      console.log("Search query:", query);
      setPosts(response);
    };

    const handleEdit = (post: Post) => {
      setSelectedPost(post);
      setShowEditModal(true);
    };

    const handleDelete = (post: Post) => {
      setSelectedPost(post);
      setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
      // Implement delete post logic here
      console.log('Deleting post:', selectedPost?._id);
      setShowDeleteModal(false);
      setSelectedPost(null);
      // Refresh posts after deletion
      window.location.reload();
    };

    useEffect(() => {
      const fetchPosts = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const allPosts = await searchPosts(user.username);
        console.log("Fetched posts:", allPosts);
        setPosts(allPosts);
      };
      fetchPosts();
    }, [posts]);

  const SearchIcon: React.FC = () => (
    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
    </svg>
  );

  const EditIcon: React.FC = () => (
    <svg className="w-4 h-4 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const DeleteIcon: React.FC = () => (
    <svg className="w-4 h-4 text-gray-500 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

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

                {/* Create Post Modal */}
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

                {/* Edit Post Modal */}
                {showEditModal && selectedPost && (
                <>
                  <div
                  className="fixed inset-0 z-40 bg-black opacity-70"
                  onClick={() => setShowEditModal(false)}
                  />
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                    <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                    onClick={() => setShowEditModal(false)}
                    aria-label="Close"
                    >
                    ×
                    </button>
                    <h2 className="text-black text-xl font-semibold mb-6">Edit Post</h2>
                    <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // Implement edit post logic here
                      console.log('Editing post:', selectedPost._id);
                      await editPost(
                        `${selectedPost._id}`,
                        e.currentTarget.topic.value,
                        e.currentTarget.content.value,
                        e.currentTarget.community.value,
                        JSON.parse(localStorage.getItem('user')).username
                      );
                      setShowEditModal(false);
                      setSelectedPost(null);
                    }}
                    className="space-y-4"
                    >
                    <div className="relative">
                      <select
                        className="text-gray-600 w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        name='community'
                        defaultValue={selectedPost.community}
                      >
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
                      name='topic'
                      defaultValue={selectedPost.topic}
                      className="text-gray-600 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <textarea
                      placeholder="What's on your mind..."
                      name='content'
                      defaultValue={selectedPost.content}
                      className="text-gray-600 placeholder:text-gray-400 w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={8}
                      required
                    />
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#49A569] hover:bg-[#3B7A52] text-white rounded-lg font-medium transition-colors"
                    >
                      Confirm
                    </button>
                    </div>
                    </form>
                  </div>
                  </div>
                </>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedPost && (
                <>
                  <div
                  className="fixed inset-0 z-40 bg-black opacity-70"
                  onClick={() => setShowDeleteModal(false)}
                  />
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                    onClick={() => setShowDeleteModal(false)}
                    aria-label="Close"
                    >
                    ×
                    </button>
                    <h2 className="text-black text-xl font-semibold mb-4">Delete Post</h2>
                    <div className="mb-6">
                      <p className="text-gray-600 mb-2">Please confirm if you wish to</p>
                      <p className="text-gray-600 mb-4"><strong>delete the post</strong></p>
                      <p className="text-gray-500 text-sm">Are you sure you want to delete the post?</p>
                      <p className="text-gray-500 text-sm">Once deleted, it will be lost forever.</p>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                    </div>
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
                <div className="flex items-center justify-between">
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
                  {/* Edit and Delete Icons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <DeleteIcon />
                    </button>
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
