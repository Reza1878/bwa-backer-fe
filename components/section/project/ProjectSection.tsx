import { Container, Typography } from "components/common";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CampaignService } from "service/campaign_service";
import { ProjectType } from "service/types";
import ProjectItem from "./ProjectItem";

function ProjectSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await CampaignService.gets();
      if (!active) return;

      if (response.meta.code !== 200) {
        toast("Failed to fetch campaign!", { type: "error", autoClose: 3000 });
      }

      setProjects(response.data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Container id="project-section">
      <div className="flex flex-wrap justify-between items-center">
        <Typography variant="h4">
          New projects you can <br className="hidden lg:block" />
          taken care of
        </Typography>

        <a href="#" className="w-full lg:w-auto hover:underline">
          View all
        </a>
      </div>

      <div className="flex flex-wrap mt-4 text-">
        {projects.map((project: ProjectType, index) => (
          <ProjectItem
            id={project.id}
            description={project.short_description}
            key={index}
            title={project.name}
            progress={(project.current_amount / project.goal_amount) * 100}
            image={project.image_url}
            target={project.goal_amount}
          />
        ))}
      </div>
    </Container>
  );
}

export default ProjectSection;
