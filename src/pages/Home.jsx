import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            service.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [authStatus]);

    if (authStatus === true) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        if (posts.length === 0) {
            return (
                <h1 className='text-4xl font-bold font-sans text-center my-12'>No Posts Available! Create your Post Now</h1>
            );
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
            );
        }
    }
}

export default Home;