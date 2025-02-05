import { useCallback, useState } from "react";
import { EventType } from "@/type/Event";

import { NotLoginHeader } from ".";

export default {
  component: NotLoginHeader,
  title: "organisms/NotLoginHeader",
  decorators: [
    (Story: any) => <div style={{ padding: "5rem" }}>{Story()}</div>,
  ],
};

export const NotLoginHeaderOrganisms = () => {
  /* state定義 */
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");

  /* action定義 */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  return (
    <NotLoginHeader
      searchInputValue={inputArticleSearch}
      handleInputSearch={handleInputSearch}
    />
  );
};

NotLoginHeaderOrganisms.storyName = "Default";
