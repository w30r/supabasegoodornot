"use client";
import { Input } from "@/components/ui/input";
import { getAllLobbies } from "../actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    function fetchData() {
      const res = getAllLobbies();
      setData(res);
    }
    fetchData();
  }, []);

  console.log("🚀 ~ Page ~ data:", data);

  return (
    <div className="flex flex-col justify-center items-center my-24 gap-4">
      <h1>Mana Makan? Supabase.</h1>
      {/* INPUT */}
      <div className="flex gap-1 w-full items-center justify-center">
        <Input type="text" placeholder="Room Code" className="w-1/2" />
        <Button>Add</Button>
      </div>
    </div>
  );
}
