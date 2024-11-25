import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Mockinterview = pgTable("mockinterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockresp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesciption: varchar("jobDesciption").notNull(),
  jobExperiance: varchar("jobExperiance").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});
