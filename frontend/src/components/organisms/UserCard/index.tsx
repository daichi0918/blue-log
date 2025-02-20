"use client";

import { memo } from "react";
import { BaseButton } from "@/components/atoms/BaseButton";
import { UserImage } from "@/components/atoms/UserImage";
import { IconContext } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import style from "./styles.module.css";

/**
 * UserCard
 *
 * @package molecules
 */

type UserCardProps = {
  userName: string;
  userImage: string | null;
  userProfile: string | null;
  twitterURL: string | null;
  githubURL: string | null;
  facebookURL: string | null;
  profile: string | null;
  follower?: number;
  following?: number;
  isAuth: boolean;
};

/**
 * UserCard
 * @param
 * @returns {JSX.Element}
 */
export const UserCard = memo((props: UserCardProps) => {
  const {
    userName,
    userImage,
    userProfile,
    twitterURL,
    githubURL,
    facebookURL,
    follower,
    following,
    isAuth,
  } = props;
  /**
   * Xへ遷移
   */
  const navigateToX = (url: string | null) => {
    window.open(url ?? "https://twitter.com", "_blank");
  };
  /**
   * GitHubへ遷移
   */
  const navigateToGithub = (url: string | null) => {
    window.open(url ?? "https://github.com", "_blank");
  };
  /**
   * Facebookへ遷移
   */
  const navigateToFacebook = (url: string | null) => {
    window.open(url ?? "https://facebook.com", "_blank");
  };
  return (
    <div className={style.userProfileWrapper}>
      <div className={style.userInfo}>
        <UserImage image={userImage} userName={userName} />
        <p className={style.userName}>{userName}</p>
      </div>
      <div className={style.followWrapper}>
        <p>
          <span>{follower}</span>フォロワー <span>{following}</span>フォロー中
        </p>
      </div>
      {userProfile && (
        <div className={style.userProfile}>
          <p className={style.profileText}>{userProfile}</p>
        </div>
      )}
      <BaseButton
        color={"secondary"}
        size={"small"}
        text={isAuth ? "プロフィールを編集" : "フォロー"}
        additionalStyle={{ width: "100%", margin: "15px 0" }}
      />
      <div className={style.userSnsInfo}>
        <IconContext.Provider
          value={{ size: "20px", style: { marginRight: "15px" } }}
        >
          <FaXTwitter onClick={() => navigateToX(twitterURL)} />
        </IconContext.Provider>
        <IconContext.Provider
          value={{ size: "20px", style: { marginRight: "15px" } }}
        >
          <FaGithub onClick={() => navigateToGithub(githubURL)} />
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            size: "20px",
            style: { marginRight: "15px", color: "#0966ff" },
          }}
        >
          <FaFacebook onClick={() => navigateToFacebook(facebookURL)} />
        </IconContext.Provider>
      </div>
    </div>
  );
});
