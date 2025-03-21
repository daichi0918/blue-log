"use client";

import { memo, useCallback, useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { followUserApi, unfollowUserApi } from "@/apis/authApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { SNSIcon } from "@/components/atoms/SNSIcon";
import { UserImage } from "@/components/atoms/UserImage";
import { UserLink } from "@/components/atoms/UserLink";
import { AuthContext } from "@/contexts/AuthContext";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { LoginModal } from "../LoginModal";
import style from "./styles.module.css";

/**
 * UserCard
 *
 * @package molecules
 */

type UserCardProps = {
  userId: number;
  userName: string;
  userImage: string | null;
  userProfile: string | null;
  twitterURL: string | null;
  githubURL: string | null;
  facebookURL: string | null;
  color: string;
  profile: string | null;
  followers?: Array<number>;
  followerCount?: number;
  followingCount?: number;
};

/**
 * UserCard
 * @param
 * @returns {JSX.Element}
 */
export const UserCard = memo((props: UserCardProps) => {
  const param = useParams();
  const router = useRouter();
  const { user, isAuth } = useContext(AuthContext);

  const {
    userId,
    userName,
    userImage,
    userProfile,
    twitterURL,
    githubURL,
    facebookURL,
    color,
    followers,
    followerCount,
    followingCount,
  } = props;
  const [isFollowing, setIsFollowing] = useState(
    followers?.includes(user?.id ?? -1),
  );
  const [showModal, setShowModal] = useState(false);
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
  /**
   * プロフィール画面への遷移
   */
  const navigateToProfile = useCallback(() => {
    void router.push(`/user/${userId}/settings`);
  }, [router, userId]);

  /**
   * ユーザーフォロー関数
   */
  /** フォロー処理 */
  const followUser = useCallback(async (): Promise<void> => {
    try {
      const res = await followUserApi(String(param.id));
      // console.log(res?.code);
      setIsFollowing(res?.code === 201 && true);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    }
  }, [param.id]);

  /**
   * ユーザーアンフォロー関数
   */
  /** フォロー処理 */
  const unfollowUser = useCallback(async (): Promise<void> => {
    try {
      const res = await unfollowUserApi(String(param.id));
      // console.log(res?.code);
      setIsFollowing(res?.code === 200 && false);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    }
  }, [param.id]);
  return (
    <>
      <div className={style.userProfileWrapper}>
        <UserLink userId={userId}>
          <div className={style.userInfo}>
            <UserImage image={userImage} userName={userName} color={color} />
            <p className={style.userName}>{userName}</p>
          </div>
        </UserLink>

        <div className={style.followWrapper}>
          <p>
            <span>{followerCount}</span>フォロワー <span>{followingCount}</span>
            フォロー中
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
          text={
            !isAuth
              ? "フォロー"
              : userId === user?.id
                ? "プロフィールを編集"
                : isFollowing
                  ? "フォローを外す"
                  : "フォロー"
          }
          onClick={
            !isAuth
              ? () => setShowModal(true)
              : userId === user?.id
                ? () => void navigateToProfile()
                : isFollowing
                  ? () => void unfollowUser()
                  : () => void followUser()
          }
          additionalStyle={{ width: "100%", margin: "15px 0" }}
        />
        <div className={style.userSnsInfo}>
          <SNSIcon
            Icon={FaXTwitter}
            onClick={() => navigateToX(twitterURL)}
            iconContextValue={{ size: "20px", style: { marginRight: "15px" } }}
          />

          <SNSIcon
            Icon={FaGithub}
            onClick={() => navigateToGithub(githubURL)}
            iconContextValue={{ size: "20px", style: { marginRight: "15px" } }}
          />

          <SNSIcon
            Icon={FaFacebook}
            onClick={() => navigateToFacebook(facebookURL)}
            iconContextValue={{
              size: "20px",
              style: { marginRight: "15px", color: "#0966ff" },
            }}
          />
        </div>
      </div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
});
