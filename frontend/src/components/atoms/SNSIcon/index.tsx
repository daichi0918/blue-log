import type { IconType } from "react-icons";
import { IconContext } from "react-icons";

import style from "./styles.module.css";

type SNSIconProps = {
  Icon: IconType;
  onClick: () => void;
  iconContextValue: React.ComponentProps<typeof IconContext.Provider>["value"];
};

export const SNSIcon = ({ Icon, onClick, iconContextValue }: SNSIconProps) => {
  return (
    <div className={style.icon}>
      <IconContext.Provider value={iconContextValue}>
        <Icon onClick={onClick} />
      </IconContext.Provider>
    </div>
  );
};
