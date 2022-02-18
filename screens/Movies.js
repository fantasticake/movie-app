import React from "react";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import { useInfiniteQuery, useQuery } from "react-query";
import styled from "styled-components/native";
import api from "../api";
import DiscoveryButton from "../Components/DiscoveryButton";
import HorizontalList from "../Components/HorizontalList";
import Slider from "../Components/Slider";
import ThemeButton from "../Components/ThemeButton";
import VerticalItem from "../Components/VerticalItem";
import { getInfinityQueryData, getNextPageParam } from "../utils";

const Container = styled.View`
  background-color: ${(props) => props.theme.style.backgroundColor};
`;

const Separator = styled.View`
  height: 20px;
`;

const ListName = styled.Text`
  color: ${(props) => props.theme.style.textColor};
  font-weight: 700;
  font-size: 20px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Movies = () => {
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    refetch: refetchTrending,
  } = useQuery(["movies", "trending"], api.movies.trending);
  const {
    data: topRatedData,
    isLoading: isTopRatedLoading,
    refetch: refetchTopRated,
    hasNextPage: hasNextPageTopRated,
    fetchNextPage: fetchNextPageTopRated,
  } = useInfiniteQuery(["movies", "topRated"], api.movies.topRated, {
    getNextPageParam,
  });
  const {
    data: nowPlayingData,
    isLoading: isNowPlayingLoading,
    refetch: refetchNowPlaying,
    hasNextPage: hasNextPageNowplaying,
    fetchNextPage: fetchNextPageNowPlaying,
  } = useInfiniteQuery(["movies", "nowPlaying"], api.movies.nowPlaying, {
    getNextPageParam,
  });

  const onEndReached = () => {
    if (hasNextPageNowplaying) fetchNextPageNowPlaying();
  };

  const onRefresh = () => {
    refetchTrending();
    refetchTopRated();
    refetchNowPlaying();
  };

  const loading = isTrendingLoading || isTopRatedLoading || isNowPlayingLoading;

  if (loading) return null;
  return (
    <Container>
      <DiscoveryButton isMovie={true} />
      <ThemeButton />
      <OptimizedFlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        onEndReached={onEndReached}
        refreshing={false}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <Slider data={trendingData.results} />
            <HorizontalList
              name="높은 평점"
              data={getInfinityQueryData(topRatedData)}
              hasNextPage={hasNextPageTopRated}
              fetchNextPage={fetchNextPageTopRated}
            />
            <ListName>상영중</ListName>
          </>
        }
        data={getInfinityQueryData(nowPlayingData)}
        renderItem={({ item }) => <VerticalItem {...item} />}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id + ""}
        disableVirtualization={false}
      />
    </Container>
  );
};

export default Movies;
