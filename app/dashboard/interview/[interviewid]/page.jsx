"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Mockinterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, LoaderCircle, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { use } from "react";
import Link from "next/link";

export default function InterviewId({ params }) {
  const resolvedParams = use(params);
  const interviewid = resolvedParams?.interviewid;

  const [interviewData, setInterviewData] = useState([]);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (interviewid) {
      console.log("Interview ID:", interviewid);
      GetInterviewIdDetails(interviewid);
    }
  }, [interviewid]);
  const interview = interviewData[0];

  const GetInterviewIdDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(Mockinterview)
        .where(eq(Mockinterview.mockId, id));
      console.log("Interview Details:", result);
      setInterviewData(result);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h1 className="font-bold text-2xl">Let's get started</h1>
      <div className="flex items-center justify-around gap-7 w-full">
        <div className="flex flex-col items-start justify-center gap-2 border rounded-lg w-[50%] ">
          {interview ? (
            <>
              <h3>
                <strong className="font-bold">Job Position/Job Role : </strong>
                {interview.jobPosition}
              </h3>
              <p>
                {" "}
                <strong className="font-bold">Job Description : </strong>
                {interview.jobDesciption}
              </p>
              <p>
                {" "}
                <strong className="font-bold">Job Experiance : </strong>
                {interview.jobExperiance}
              </p>
              <p>
                {" "}
                <strong className="font-bold">Job Created Date : </strong>{" "}
                {interview.createdAt}
              </p>
              <p>
                {" "}
                <strong className="font-bold">Job Created By : </strong>{" "}
                {interview.createdBy}
              </p>
              <div className="border-yellow-500 bg-yellow-200 p-3 rounded-lg items-start">
                <div className="flex text-start text-yellow-600 ">
                  <Lightbulb />
                  <span>Information</span>
                </div>
                <p className="text-yellow-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequatur assumenda nam facilis esse enim fugiat modi
                  tenetur corrupti veniam. Nostrum officia aspernatur odit ipsa
                  quisquam iure sed reiciendis eligendi facilis veritatis est
                  adipisci necessitatibus praesentium excepturi maxime vero,
                </p>
              </div>
            </>
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </div>
        <div className="mt-10">
          {webCamEnabled ? (
            // Guard browser-dependent Webcam rendering
            typeof window !== "undefined" && (
              <Webcam
                onUserMedia={() => {
                  setWebCamEnabled(true);
                }}
                onUserMediaError={() => {
                  setWebCamEnabled(false);
                }}
                mirrored={true}
                style={{ height: 300, width: 300 }}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                onClick={() => {
                  setWebCamEnabled(true);
                }}
              >
                Enable Webcam and Camera
              </Button>

              <Button className="mt-7">
                <Link
                  href={
                    "/dashboard/interview/" +
                    resolvedParams?.interviewid +
                    "/start"
                  }
                >
                  Start Interview
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
