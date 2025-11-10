'use client'
import { useRouter } from "next/navigation";
const DashBoard = () => {
    const router = useRouter();
    const handleIndexIdea = () => {
        router.push("/ideas");
    }
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <a onClick={handleIndexIdea} className="border-b">投稿一覧</a>

        </div>
    )
};
 
export default DashBoard;