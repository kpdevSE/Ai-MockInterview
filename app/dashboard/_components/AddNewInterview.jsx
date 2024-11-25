"use client";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAi";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { Mockinterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

export default function AddNewInterview() {
  const [openDialog, setOpendialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesciption, setJobDescription] = useState();
  const [jobExperiance, setJobExperiance] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setjsonResponse] = useState([]);
  const { user } = useUser();
  const route = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesciption, jobPosition, jobExperiance);

    const inputPrompt =
      "Job Position" +
      jobPosition +
      "Job Description" +
      jobDesciption +
      "Job Experiance" +
      jobExperiance +
      "Depends on this job position , job description, job experiance give us " +
      process.env.NEXT_PUBLIC_QUESTIONS_COUNT +
      "interview questions along with Answers in Json Format ,Give Us Questions And Answers on JSON format";

    const result = await chatSession.sendMessage(inputPrompt);

    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResp));
    setjsonResponse(MockJsonResp);
    if (MockJsonResp) {
      const resp = await db
        .insert(Mockinterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesciption: jobDesciption,
          jobExperiance: jobExperiance,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: Mockinterview.mockId });

      console.log("Inserted ID", resp);
      if (resp) {
        setOpendialog(false);
        route.push("/dashboard/initerview/" + resp[0]?.mockId);
      }
    } else {
      console.log("Error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer"
        onClick={() => {
          setOpendialog(true);
        }}
      >
        <h2 className="font-bold text-lg text-center cursor-pointer">
          +Add New
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position, role, job description, and
              years of experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="mt-7 my-2">
              <label>Job Role/Job Position</label>
              <Input
                placeholder="Ex . Fullstack Developer"
                required
                onChange={(event) => {
                  setJobPosition(event.target.value);
                }}
              />
            </div>
            <div className="mt-7 my-2">
              <label>Job Description</label>
              <Textarea
                placeholder="Ex . React, Angular, Next, MySql, Node"
                required
                onChange={(event) => {
                  setJobDescription(event.target.value);
                }}
              />
            </div>
            <div className="mt-7 my-2">
              <label>Years of Experience</label>
              <Input
                placeholder="5"
                type="number"
                required
                max="50"
                onChange={(event) => {
                  setJobExperiance(event.target.value);
                }}
              />
            </div>
            <div className="flex gap-5 justify-end mt-7">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpendialog(false);
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <p>Generate from AI</p>
                  </div>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
