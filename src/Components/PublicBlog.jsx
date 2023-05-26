import React, {useState, useEffect} from 'react'



const PublicBlog = () => {
      
        const blogInitial = [];
        const [blogs , setBlogs] = useState(blogInitial)
        const host = 'http://localhost:3500';
        const CategoryInitial = [];
        const [categories, setCategories] = useState(CategoryInitial);
        
        // Get all Blogs publically
        const getBlogs = async () => {
          // API CALL
          const response = await fetch(`${host}/api/blogs/public`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json();
          setBlogs(json);
          console.log(json)
        }

          // Get all categories
          const getCategory = async () => {
            // API CALL
            const response = await fetch(`${host}/api/category/allcategories`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            });
            const json = await response.json();
            setCategories(json);
          }

        useEffect(() => { 
          getBlogs();
          getCategory();
        }, []);

        const formatDate = (dateString) => {
          const options = { day: 'numeric', month: 'short', year: 'numeric' };
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', options).toUpperCase();
        };

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog._id} blog={blog} className="flex max-w-xl flex-col items-start justify-between">
            {/* <BlogItem  key={blog.id} blog={blog} updateBlog={updateBlog} showAlert={props.showAlert} /> */}
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={blog.datetime} className="text-gray-500">
                {formatDate(blog.date)}
                </time>
                {blog.category && blog.category.length > 0 && (
                 <label
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {blog.category[0].content}
                  
                   </label>
                    )}
              </div>
                    
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={"/MyBlogs/" + blog._id}>
                    <span className="absolute inset-0" />
                    {blog.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
              </div>
              <label
                  className=" my-3 relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {blog.user}
                   </label>
              </article>
              
          ))}
        </div>
      </div>
    </div>
    </div>
    
  )

}
export default PublicBlog