import { NotLoginHeader } from ".";

export default {
  component: NotLoginHeader,
  title: "organisms/NotLoginHeader",
  decorators: [
    (Story: any) => <div style={{ padding: "5rem" }}>{Story()}</div>,
  ],
};

export const NotLoginHeaderOrganisms = () => {
  return <NotLoginHeader />;
};

NotLoginHeaderOrganisms.storyName = "Default";
