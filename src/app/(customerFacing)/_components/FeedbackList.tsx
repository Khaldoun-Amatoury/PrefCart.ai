"use client";

import { useState, useEffect } from "react";
import { Feedback } from "@/types/feedback";
import { FeedbackCard } from "@/components/FeedbackCard";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      const response = await fetch("/api/feedbacks");
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    }
    fetchFeedbacks();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-semibold pl-24">Testimonials</h2>
      <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            fullName={feedback.fullName}
            message={feedback.message}
          />
        ))}
      </div>
    </>
  );
}
