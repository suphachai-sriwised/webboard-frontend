"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../types';
import { createComment, formatTimeAgo, getPostById } from '../api';


const PostDetail: React.FC<{
  params: Promise<{ id: string }>
}> = ({params}) => {
  const router = useRouter();
  const [newComment, setNewComment] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [addComment, setAddComment] = useState(false);
  const handleBack = () => {
    router.back();
  };

  const handlePostComment = async (postId:string) => {
    // Handle posting comment logic here
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please sign in before commenting");
      setAddComment(false);
      return;
    }
    console.log('Posting comment:', newComment);
    await createComment(postId, newComment, user.username);
    setNewComment('');
  };

  useEffect(() => {
      const fetchPost = async () => {
        const fetchedPost = await getPostById((await params).id);
        console.log("Fetched post:", fetchedPost);
        setPost(fetchedPost);
      };
      fetchPost();
  },[newComment])

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Main Post */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src="https://i.pravatar.cc/48?u=zach" 
              alt="Zach" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{post?.username}</span>
                <span className="text-gray-500 text-sm">{formatTimeAgo(post?.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-4">
            {post?.community}
          </span>
          
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            {post?.topic}
          </h1>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {post?.content}
          </p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span>💬 {post?.__v} Comments</span>
          </div>
        </div>

        {/* Comment Input */}
        {!addComment && (
          <button
            onClick={() => setAddComment(true)}
            className="mb-3 border-2 border-green-600 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            Add a Comment
          </button>
        )}
          {addComment && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          
            <>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What's on your mind..."
                className="w-full text-[#5B5B5B] placeholder:text-[#5B5B5B] h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setNewComment('')
                    setAddComment(false)
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePostComment(`${post._id}`)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </>
        </div>
          )}

        {/* Comments Section */}
        <div className="space-y-4">
          {/* Comment 1 */}
          {post?.comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={`https://i.pravatar.cc/48?u=${comment.username}`}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.username}</span>
                    <span className="text-gray-500 text-sm">{formatTimeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;