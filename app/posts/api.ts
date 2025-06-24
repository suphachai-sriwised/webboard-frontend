export const getAllPosts = async () => {
        // Simulate fetching posts from an API
        const response = await fetch('http://localhost:3001/posts').then(res => res.json());
        console.log("response > ", response)
        return response;
}

export const searchPosts = async (query: string) => {
    // Simulate searching posts from an API
    const response = await fetch(`http://localhost:3001/posts/search?q=${query}`).then(res => res.json());
    console.log("response > ", response)
    return response;
}

export const getPostById = async (id: string) => {
    // Simulate fetching a single post by ID from an API
    const response = await fetch(`http://localhost:3001/posts/${id}`).then(res => res.json());
    console.log("response > ", response)
    return response;
}

export const createComment = async (postId: string, comment: string, username: string) => {
    // Simulate posting a comment to an API
    const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          comment: comment, 
          username: username
        }),
    }).then(res => res.json());
    console.log("response > ", response)
    return response;
}
export const createPost = async (title: string, content: string, community:string, username: string) => {
  // console.log("createPost > ", title, content, community, username)
  // return true
    // Simulate posting a new post to an API
    const response = await fetch(`http://localhost:3001/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: title,
          content: content,
          community: community,
          username: username
        }),
    }).then(res => res.json());
    console.log("response > ", response)
    return response;
}

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
};

