import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");

    // BLOCKER: Don't send the request if ID is missing
    if (!userId || userId === "undefined") {
      toast.error("User session not found. Please log in again.");
      return navigate("/");
    }

    const taskData = {
      ...formData,
      userId: userId,
    };

    try {
      await api.post("/api/tasks", taskData);
      toast.success("Task created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-slate-50 min-h-screen">
      <Card className="w-full max-w-lg h-fit">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                required
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({ ...formData, priority: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Button for quick Status toggle */}
            <div className="flex items-center justify-between border p-3 rounded-md bg-white">
              <div className="grid gap-1.5 leading-none">
                <Label className="text-sm font-medium">Task Status</Label>
                <p className="text-sm text-muted-foreground">
                  Current:{" "}
                  <span className="font-bold text-primary">
                    {formData.status}
                  </span>
                </p>
              </div>
              <Button
                type="button"
                variant={
                  formData.status === "Completed" ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setFormData({
                    ...formData,
                    status:
                      formData.status === "Completed" ? "Pending" : "Completed",
                  })
                }
              >
                {formData.status === "Completed"
                  ? "Completed"
                  : "Mark as Completed"}
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Create Tasks
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
