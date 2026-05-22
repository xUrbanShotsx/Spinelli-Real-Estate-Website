import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Project Marketing | Spinelli Real Estate",
  description:
    "End-to-end project marketing, off-the-plan sales and site identification for Illawarra developers. Spinelli Real Estate.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
