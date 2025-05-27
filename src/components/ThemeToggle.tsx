import {useEffect, useState} from "react"
import {Moon, Sun} from "lucide-react"
import {Button} from "@/components/ui/button"

type Theme = "light" | "dark" | "system"

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem("theme") as Theme) ?? "system"
    })

    useEffect(() => {
        const root = document.documentElement

        const applyTheme = (t: Theme) => {
            if (t === "system") {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                root.classList.toggle("dark", prefersDark)
            } else {
                root.classList.toggle("dark", t === "dark")
            }
        }

        applyTheme(theme)
        localStorage.setItem("theme", theme)

        // 시스템 테마 변경도 반영 (선택된 theme이 system일 경우)
        const media = window.matchMedia("(prefers-color-scheme: dark)")
        const systemListener = () => {
            if (theme === "system") applyTheme("system")
        }

        media.addEventListener("change", systemListener)
        return () => media.removeEventListener("change", systemListener)
    }, [theme])

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
        setTheme(next)
    }

    const icon =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? <Sun className="w-5 h-5"/>
                : <Moon className="w-5 h-5"/>
            : theme === "dark"
                ? <Sun className="w-5 h-5"/>
                : <Moon className="w-5 h-5"/>

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
                {icon}
            </Button>
        </div>
    )
}

export default ThemeToggle