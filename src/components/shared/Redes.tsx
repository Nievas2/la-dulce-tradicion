"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { Icon } from "@iconify/react/dist/iconify.js"
interface Response {
  id: string
  caption: string
  media_type: string
  media_url: string
  thumbnail_url: string
  permalink: string
  like_count: string | number
}
export default function Redes() {
  const [posts, setPosts] = useState<Response[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/instagram")
        setPosts(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching Instagram posts:", error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-4">
        {posts &&
          posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              className="flex flex-col gap-2 p-4 w-[340px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex w-full">
                <div className="flex gap-4">
                  <img
                    src="/sinfondo.webp"
                    alt="logo instagram"
                    className="w-12 h-8"
                  />
                  <div className="flex flex-col">
                    <small>ladulcetradicion</small>
                    <small>Pilar Bs.As</small>
                  </div>
                </div>
                <div className="flex w-full justify-end items-center">
                  <Icon
                    icon="simple-line-icons:options-vertical"
                    className=""
                    width="12"
                    height="12"
                  />
                </div>
              </div>
              <img
                src={
                  post.media_type === "VIDEO"
                    ? post.thumbnail_url
                    : post.media_url
                }
                alt={post.caption || "Instagram post"}
                className="w-full h-64 object-cover"
              />
              <div className="">
                <small>
                  <b>{post.like_count}</b> likes
                </small>
                <p className="text-sm text-gray-600">
                  {post.caption?.substring(0, 100)}...
                </p>
              </div>
            </a>
          ))}
      </div>
    </div>
  )
}
