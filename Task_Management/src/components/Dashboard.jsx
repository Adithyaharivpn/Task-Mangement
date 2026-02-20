import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // npx shadcn@latest add badge
import { Trash2, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?userId=${userId}`);
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (!userId) navigate("/login");
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (taskId, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "In Progress" : "Completed";
    try {
      await api.put(`/tasks/${taskId}`, { status: nextStatus, userId });
      toast.success(`Task marked as ${nextStatus}`);
      fetchTasks();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`, { data: { userId } });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <Button onClick={() => navigate("/add-task")}>+ New Task</Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task._id} className="flex items-center justify-between p-4 shadow-sm">
            <div className="space-y-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline">Priority: {task.priority}</Badge>
                <Badge variant="secondary">Due: {new Date(task.dueDate).toLocaleDateString()}</Badge>
                <Badge className={task.status === "Completed" ? "bg-green-500" : "bg-blue-500"}>
                  {task.status}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              {task.status !== "Completed" && (
                <Button size="sm" variant="ghost" onClick={() => handleUpdateStatus(task._id, task.status)}>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => handleDelete(task._id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}