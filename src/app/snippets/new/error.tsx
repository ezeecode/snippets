'use client';

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}
    

export default function ErrorPage({error}: ErrorPageProps) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
        </div>
    )
}