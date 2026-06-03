import type { Metadata } from "next";
import AppraisalPage from "./AppraisalPage";

export const metadata: Metadata = {
  title: "Book a Free Appraisal | Spinelli Real Estate",
  description:
    "Book a free, obligation-free property appraisal with Spinelli Real Estate — Illawarra's trusted local experts.",
};

export default function AppraisalRoute() {
  return <AppraisalPage />;
}
