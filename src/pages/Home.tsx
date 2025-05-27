import {useNavigate} from "react-router-dom"
import {Card, CardContent} from "@/components/ui/card"

const features = [
    {label: "할 일 관리", emoji: "📝", path: "/todo"},
    {label: "파일 탐색기", emoji: "📁", path: "/files"},
    {label: "설정", emoji: "⚙️", path: "/settings"},
]

const Home = () => {
    const navigate = useNavigate()

    return (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 max-w-6xl mx-auto">
            {features.map(({label, emoji, path}) => (
                <Card
                    key={path}
                    onClick={() => navigate(path)}
                    className="cursor-pointer hover:shadow-lg transition-all"
                >
                    <CardContent className="p-6 text-center space-y-2">
                        <div className="text-4xl">{emoji}</div>
                        <div className="text-lg font-semibold">{label}</div>
                    </CardContent>
                </Card>
            ))}
        </main>
    )
}

export default Home