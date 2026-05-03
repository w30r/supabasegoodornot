"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus, Trash2, Apple, Flame } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

type FoodEntry = {
  id: number;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  created_at?: string;
};

export default function Page() {
  const [data, setData] = useState<FoodEntry[]>([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Daily goals
  const DAILY_CALORIE_GOAL = 2000;
  const DAILY_PROTEIN_GOAL = 150;
  const DAILY_CARBS_GOAL = 250;
  const DAILY_FATS_GOAL = 65;

  useEffect(() => {
    async function fetchData() {
      // TODO: Add getAllFoodEntries() action
      // const res = await getAllFoodEntries();
      // if (res && !('error' in res)) {
      //   setData(res);
      // }
    }
    fetchData();
  }, []);

  async function handleAddEntry() {
    if (!foodName.trim() || !calories) return;

    setIsLoading(true);
    // TODO: Add createFoodEntry() action
    // const result = await createFoodEntry({
    //   food_name: foodName,
    //   calories: Number(calories),
    //   protein: Number(protein) || 0,
    //   carbs: Number(carbs) || 0,
    //   fats: Number(fats) || 0,
    // });
    // if (result && !('error' in result)) {
    //   setData([result, ...data]);
    //   setFoodName("");
    //   setCalories("");
    //   setProtein("");
    //   setCarbs("");
    //   setFats("");
    // }
    setIsLoading(false);
  }

  async function handleDeleteEntry(id: number) {
    // TODO: Add deleteFoodEntryById() action
    // const result = await deleteFoodEntryById(id);
    // if (result && !('error' in result)) {
    //   setData(data.filter(entry => entry.id !== id));
    // }
  }

  // Calculate totals
  const totalCalories = data.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = data.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = data.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFats = data.reduce((sum, entry) => sum + entry.fats, 0);

  // Calculate percentages
  const calorieProgress = Math.min(
    (totalCalories / DAILY_CALORIE_GOAL) * 100,
    100,
  );
  const proteinProgress = Math.min(
    (totalProtein / DAILY_PROTEIN_GOAL) * 100,
    100,
  );
  const carbsProgress = Math.min((totalCarbs / DAILY_CARBS_GOAL) * 100, 100);
  const fatsProgress = Math.min((totalFats / DAILY_FATS_GOAL) * 100, 100);

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Apple className="w-8 h-8 text-primary" />
            Calorie Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your daily nutrition
          </p>
        </div>

        {/* Daily Summary Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              Today's Progress
            </CardTitle>
            <CardDescription>Your daily nutrition goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Calories */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Calories</span>
                <span className="text-muted-foreground">
                  {totalCalories} / {DAILY_CALORIE_GOAL} kcal
                </span>
              </div>
              <Progress value={calorieProgress} className="h-2" />
            </div>

            <Separator />

            {/* Macros Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Protein */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Protein</div>
                <div className="text-2xl font-bold text-primary">
                  {totalProtein}g
                </div>
                <Progress value={proteinProgress} className="h-1.5" />
                <div className="text-xs text-muted-foreground">
                  Goal: {DAILY_PROTEIN_GOAL}g
                </div>
              </div>

              {/* Carbs */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Carbs</div>
                <div className="text-2xl font-bold text-secondary">
                  {totalCarbs}g
                </div>
                <Progress value={carbsProgress} className="h-1.5" />
                <div className="text-xs text-muted-foreground">
                  Goal: {DAILY_CARBS_GOAL}g
                </div>
              </div>

              {/* Fats */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Fats</div>
                <div className="text-2xl font-bold text-accent">
                  {totalFats}g
                </div>
                <Progress value={fatsProgress} className="h-1.5" />
                <div className="text-xs text-muted-foreground">
                  Goal: {DAILY_FATS_GOAL}g
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Food Entry Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add Food Entry</CardTitle>
            <CardDescription>Log what you ate today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Food Name & Calories Row */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Food name (e.g., Chicken breast)"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Macros Row */}
            <div className="grid grid-cols-3 gap-3">
              <Input
                type="number"
                placeholder="Protein (g)"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="number"
                placeholder="Carbs (g)"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="number"
                placeholder="Fats (g)"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleAddEntry}
              disabled={isLoading || !foodName.trim() || !calories}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </CardContent>
        </Card>

        {/* Food Entries List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Today's Meals</CardTitle>
            <CardDescription>{data.length} entries logged</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.length === 0 ? (
                <div className="text-center py-8">
                  <Apple className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                  <p className="text-muted-foreground">
                    No entries yet. Start logging your meals!
                  </p>
                </div>
              ) : (
                data.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 p-4 rounded-md hover:bg-muted/50 transition-colors group border border-transparent hover:border-border"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {entry.food_name}
                      </div>
                      <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                        <span className="font-medium text-primary">
                          {entry.calories} kcal
                        </span>
                        <span>P: {entry.protein}g</span>
                        <span>C: {entry.carbs}g</span>
                        <span>F: {entry.fats}g</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
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
      </div>
    </div>
  );
}
