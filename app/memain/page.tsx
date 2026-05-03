"use client";
import { Input } from "@/components/ui/input";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodoById,
} from "../actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus, CheckCircle2, Circle, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Todo = {
  id: number;
  task: string;
  isDone: boolean;
};

export default function Page() {
  const [data, setData] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllTodos();
      if (res && !("error" in res)) {
        setData(res);
      }
    }
    fetchData();
  }, []);

  async function handleAddTodo() {
    if (!newTodo.trim()) return;

    setIsLoading(true);
    const result = await createTodo(newTodo);
    if (result && !("error" in result)) {
      setData([result, ...data]);
      setNewTodo("");
    }
    setIsLoading(false);
  }

  async function handleToggleTodo(id: number, currentStatus: boolean) {
    const result = await updateTodo(id, { isDone: !currentStatus });
    if (result && !("error" in result)) {
      setData(
        data.map((todo) =>
          todo.id === id ? { ...todo, isDone: !currentStatus } : todo,
        ),
      );
    }
  }

  async function handleDeleteTodo(id: number) {
    const result = await deleteTodoById(id);
    if (result && !("error" in result)) {
      setData(data.filter((todo) => todo.id !== id));
    }
  }

  const completedCount = data.filter((t) => t.isDone).length;
  const activeCount = data.length - completedCount;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Mana Makan? 🍽️
            </CardTitle>
            <CardDescription className="text-base">
              Keep track of your tasks with ease
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Input Section */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new todo..."
                className="h-11 text-base"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                disabled={isLoading}
              />
              <Button
                onClick={handleAddTodo}
                disabled={isLoading || !newTodo.trim()}
                className="h-11 px-5"
                size="default"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add
              </Button>
            </div>

            {/* Stats */}
            {data.length > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {activeCount}
                    </span>{" "}
                    active
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {completedCount}
                    </span>{" "}
                    completed
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {data.length}
                    </span>{" "}
                    total
                  </span>
                </div>
                <Separator />
              </>
            )}

            {/* Todo List */}
            <div className="space-y-1">
              {data.length === 0 ? (
                <div className="text-center py-12">
                  <Circle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-muted-foreground">
                    No todos yet. Add one to get started!
                  </p>
                </div>
              ) : (
                data.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group border border-transparent hover:border-border"
                  >
                    <button
                      onClick={() => handleToggleTodo(todo.id, todo.isDone)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {todo.isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-base transition-colors ${
                        todo.isDone
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {todo.task}
                    </span>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-all text-destructive hover:text-destructive/80 hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Built with Next.js + Supabase
        </p>
      </div>
    </div>
  );
}
