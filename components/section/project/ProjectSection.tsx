import { Container, Typhograpy } from "components/common";
import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectSection() {
  const projects = [
    {
      image: "/project-thumbnail-1.jpg",
      title: "Robotic Hand",
      description: "Creating robotic hand for better movement",
      target: 10000000,
      progress: 20,
    },
    {
      image: "/project-thumbnail-2.jpg",
      title: "Auto Pilot Drone",
      description: "Self driving drone, no worry to drive again",
      target: 12000000,
      progress: 30,
    },
    {
      image: "/project-thumbnail-3.jpg",
      title: "Wireboard",
      description: "The new era of mechanical keyboard",
      target: 23000000,
      progress: 25,
    },
    {
      image: "/project-thumbnail-4.jpg",
      title: "Wireless Earphone",
      description: "Just pair to phone and ready to set",
      target: 405000000,
      progress: 50,
    },
    {
      image: "/project-thumbnail-5.jpg",
      title: "Auto Heater",
      description: "Make the room keep warm automatically",
      target: 124000000,
      progress: 75,
    },
    {
      image: "/project-thumbnail-6.jpg",
      title: "Smart Lock",
      description: "Open the door with just one tap and click",
      target: 60000000,
      progress: 85,
    },
  ];
  return (
    <Container>
      <div className="flex flex-wrap justify-between items-center">
        <Typhograpy variant="h4">
          New projects you can <br className="hidden lg:block" />
          taken care of
        </Typhograpy>

        <a href="#" className="w-full lg:w-auto hover:underline">
          View all
        </a>
      </div>

      <div className="flex lg:justify-between flex-wrap mt-4 text-">
        {projects.map((project, index) => (
          <ProjectItem
            description={project.description}
            key={index}
            title={project.title}
            progress={project.progress}
            image={project.image}
            target={project.target}
          />
        ))}
      </div>
    </Container>
  );
}

export default ProjectSection;
