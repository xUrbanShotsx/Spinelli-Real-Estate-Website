import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../data";
import ProjectDetailContent from "./ProjectDetailContent";
import ShaWoodDetailContent from "./ShaWoodDetailContent";

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.name} — Spinelli Real Estate`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  if (id === "shawood-cascadia") return <ShaWoodDetailContent project={project} />;
  return <ProjectDetailContent project={project} />;
}
