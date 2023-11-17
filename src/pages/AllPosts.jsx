import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import service from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    if (posts.length==0) {
        return (
            <h1 className='text-4xl font-bold font-sans text-center my-12'>No Posts Available! Create your Post Now</h1>
        )
    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default AllPosts