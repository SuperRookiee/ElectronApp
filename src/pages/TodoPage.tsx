import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {CalendarIcon, Trash2, Pencil} from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {cn} from "@/lib/utils"

const getToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

interface Todo {
    text: string
    dueDate?: string // optional
    createdAt: number
    isEditing?: boolean
    completed?: boolean
}

const TodoPage = () => {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState<Todo[]>([])
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
    const [sortBy, setSortBy] = useState<"created" | "due">("created")

    const addTodo = () => {
        const trimmed = input.trim()
        if (!trimmed) return
        const selectedDate = dueDate ?? getToday()
        setTodos([...todos, {
            text: trimmed,
            dueDate: selectedDate.toISOString(),
            createdAt: Date.now(),
            completed: false
        }])
        setInput("")
        setDueDate(undefined)
    }

    const removeTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index))
    }

    const toggleEdit = (index: number) => {
        setTodos(todos.map((todo, i) => i === index ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const updateTodoText = (index: number, newText: string) => {
        setTodos(todos.map((todo, i) => i === index ? {...todo, text: newText} : todo))
    }

    const toggleComplete = (index: number) => {
        setTodos(todos.map((todo, i) => i === index ? {...todo, completed: !todo.completed} : todo))
    }

    const sortedTodos = [...todos].sort((a, b) => {
        if (sortBy === "created") return b.createdAt - a.createdAt
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })

    return (
        <main className="p-8 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">📝 TODO</h1>

            <div className="flex flex-col sm:flex-row items-start gap-2">
                <div className="relative w-full">
                    <Input
                        placeholder="할 일을 입력하세요"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    />
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                aria-label="날짜 선택"
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <CalendarIcon className="w-5 h-5"/>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={setDueDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={addTodo}>추가</Button>
            </div>

            <div className="flex gap-2">
                <Button
                    variant={sortBy === "created" ? "default" : "outline"}
                    onClick={() => setSortBy("created")}
                >
                    생성순
                </Button>
                <Button
                    variant={sortBy === "due" ? "default" : "outline"}
                    onClick={() => setSortBy("due")}
                >
                    기간순
                </Button>
            </div>

            <div className="space-y-2">
                {sortedTodos.map((todo, index) => (
                    <Card key={index} className="px-4 py-2">
                        <div className="flex items-center justify-between">
                            <CardContent className="p-0 w-full text-left flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(index)}
                                />
                                {todo.isEditing ? (
                                    <Input
                                        className="w-full"
                                        value={todo.text}
                                        onChange={(e) => updateTodoText(index, e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && toggleEdit(index)}
                                    />
                                ) : (
                                    <div>
                                        <p className={cn("font-medium", todo.completed && "line-through text-muted-foreground")}>{todo.text}</p>
                                        {todo.dueDate && (
                                            <p className="text-sm text-muted-foreground">
                                                {todo.dueDate.slice(0, 10)}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="ghost" size="icon" onClick={() => toggleEdit(index)}>
                                    <Pencil className="w-4 h-4"/>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => removeTodo(index)}>
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </main>
    )
}

export default TodoPage