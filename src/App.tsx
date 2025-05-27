import {Routes, Route} from "react-router-dom"
import Layout from "@/components/Layout.tsx";
import Home from "@/pages/Home"
import TodoPage from "@/pages/TodoPage"

function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/todo" element={<TodoPage/>}/>
                {/* 기능별 페이지들 추가 */}
            </Route>
        </Routes>
    )
}

export default App