import { GuestLayout } from "components/layouts";
import { ClientSection, ProjectSection, StepSection } from "components/section";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <GuestLayout title="Backer">
      <StepSection />
      <ProjectSection />
      <ClientSection />
    </GuestLayout>
  );
};

export default Home;
