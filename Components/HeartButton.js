import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRealm } from "../context";
import { AdMobRewarded } from "expo-ads-admob";

const Container = styled.TouchableOpacity``;

const HeartButton = ({
  mediaType,
  contentId,
  title,
  name,
  poster_path,
  overview,
  backdrop_path,
}) => {
  const [isHeart, setIsHeart] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const realm = useRealm();
  const [heartList, setHeartList] = useState(realm.objects("Heart"));

  const findFromRealm = () => {
    const finded = heartList.find(
      (item) => item.mediaType === mediaType && item.contentId === contentId
    );
    return finded;
  };

  const deleteToRealm = () => {
    const finded = findFromRealm();
    realm.write(() => {
      realm.delete(finded);
    });
  };

  const createToRealm = () => {
    realm.write(() => {
      realm.create("Heart", {
        _id: new Date().valueOf(),
        mediaType,
        contentId,
        title: title,
        name: name,
        posterPath: poster_path,
        overview,
        backdropPath: backdrop_path,
      });
    });
  };

  const changeHeart = async () => {
    setDisabled(true);
    await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      AdMobRewarded.removeAllListeners();
    });
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
        if (isHeart) {
          deleteToRealm();
          setIsHeart(false);
        } else {
          createToRealm();
          setIsHeart(true);
        }
      });
    });
    setDisabled(false);
  };

  useEffect(() => {
    const finded = findFromRealm();
    if (finded) setIsHeart(true);
    else setIsHeart(false);
  }, [contentId]);

  return (
    <Container disabled={disabled} onPress={changeHeart}>
      <MaterialCommunityIcons
        name={isHeart ? "heart" : "heart-outline"}
        size={22}
        color="red"
      />
    </Container>
  );
};

export default HeartButton;
