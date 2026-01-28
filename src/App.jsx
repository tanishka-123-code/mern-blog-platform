import { useState, useEffect } from 'react';
import axios from "axios";




function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  
  useEffect(() => {
    fetchPosts();
  }, [])
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };
  const addPost = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/posts", form);
    setForm({ title: "", content: "" });
    fetchPosts();
  };
  const deletePost = async (id) => {
    try {
      await
        axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) =>
        post._id !== id));
    } catch (err) {
      console.error(err);
    }

  };
  

  useEffect(() => {
    fetchPosts();
  }, [])
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>📝Mern Blog</h1>
      {/*Form*/}
      <form onSubmit={addPost} className='bg-white shadow p-4 rounded mb-6 max-w-lg mx-auto'>
        <input type='text' placeholder='Title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className='border p-2 w-full mb-2 rounded '></input>
        <textarea placeholder='Content' value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className='border p-2 w-full mb-2 rounded'></textarea>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'>Add Post</button>

      </form>

     

      <div className='max-w-2xl mx-auto space-y-4'>
        {posts.map((post) => (
          <div key={post._id} className='bg-white shadow p-4 rounded flex justify-between items-start'>
            <div>
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <p className='text-gray-700'>{post.content}</p>
            </div>
            <div className='flex space-x-2'>
              

              <button onClick={() => deletePost(post._id)} className='text-red-500 hover:text-red-700 hover:text-xl'>❌

              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  )


}

export default App
