import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, Trash2, Plus } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
      toast.success("Task added!");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Could not delete task");
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Add Task Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleAddTask} className="flex gap-2">
              <Input 
                placeholder="What needs to be done?" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button type="submit">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No tasks yet. Add one above!</p>
          )}
          {tasks.map((task) => (
            <Card key={task._id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-md font-medium">{task.title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task._id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}