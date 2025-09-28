import React from 'react';
import Header from '../ui/header';
import Footer from '../ui/footer';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';
const PostsPage = () => {
    return (
        <>
            <Header />
            <h1>Posts Page</h1>

            <Footer />
        </>
    );
}

export default PostsPage;