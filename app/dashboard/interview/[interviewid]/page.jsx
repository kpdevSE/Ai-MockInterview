"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import { useEffect } from "react";
import { useState, use } from "react";
import Webcam from "react-webcam";

export default function InterviewId({ params }) {
  const resolvedParams = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (resolvedParams?.interviewid) {
      console.log("Interview ID:", resolvedParams.interviewid);
      GetInterviewIdDetails();
    }
  }, [resolvedParams?.interviewid]);

  const GetInterviewIdDetails = async () => {
    try {
      const result = await db
        .select()
        .from(Mockinterview)
        .where(eq(Mockinterview.mockId, resolvedParams.interviewid));
      console.log(result);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h1 className="font-bold text-2xl">Let's get started</h1>
      <div>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => {
              setWebCamEnabled(true);
            }}
            onUserMediaError={() => {
              setWebCamEnabled(false);
            }}
            style={{ height: 300, width: 100 }}
          />
        ) : (
          <div className="flex-col items-center justify-center">
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
            <Button
              onClick={() => {
                setWebCamEnabled(true);
              }}
            >
              Enable Webcam and Camer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
