import { Button } from '@/components/ui/button';
import React from 'react';

export default function About() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Hello Stranger!</h1>
      <p>This is a dummy about page, we can create any about section UI we want here.</p>
    </div>
    );
}