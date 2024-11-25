"use client";
import { db } from "@/utils/db";
import { Mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState, use } from "react";

export default function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestions] = useState();
  const resolvedParams = use(params);
  const interviewid = resolvedParams?.interviewid;
  useEffect(() => {
    GetInterviewIdDetails();
  }, [interviewid]);

  const GetInterviewIdDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(Mockinterview)
        .where(eq(Mockinterview.mockId, id));

      const jsonMockresp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestions(jsonMockresp);
      console.log(jsonMockresp);
      setInterviewData(result[0]);
    } catch (error) {
      console.log("Error fetching interview details:");
    }
  };
  return (
    <div>
      <h1>Start Interview</h1>
    </div>
  );
}
