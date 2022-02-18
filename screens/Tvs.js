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
  flex: 1;
  background-color: ${(props) => props.theme.style.backgroundColor};
`;

const ListName = styled.Text`
  color: ${(props) => props.theme.style.textColor};
  font-weight: 700;
  font-size: 20px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Separator = styled.View`
  height: 20px;
`;

const Tvs = () => {
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    refetch: refetchTrending,
  } = useQuery(["tvs", "trending"], api.tvs.trending);
  const {
    data: topRatedData,
    isLoading: isTopRatedLoading,
    refetch: refetchTopRated,
    hasNextPage: hasNextPageTopRated,
    fetchNextPage: fetchNextPageTopRated,
  } = useInfiniteQuery(["tvs", "topRated"], api.tvs.topRated, {
    getNextPageParam,
  });
  const {
    data: onTheAirData,
    isLoading: isOnTheAirLoading,
    refetch: refetchOnTheAir,
    hasNextPage: hasNextPageOnTheAir,
    fetchNextPage: fetchNextPageOnTheAir,
  } = useInfiniteQuery(["tvs", "onTheAir"], api.tvs.onTheAir, {
    getNextPageParam,
  });

  const onEndReached = () => {
    if (hasNextPageOnTheAir) fetchNextPageOnTheAir();
  };

  const onRefresh = () => {
    refetchTrending();
    refetchTopRated();
    refetchOnTheAir();
  };

  const loading = isTrendingLoading || isTopRatedLoading || isOnTheAirLoading;

  if (loading) return null;
  return (
    <Container>
      <DiscoveryButton isMovie={false} />
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
            <ListName>방영중</ListName>
          </>
        }
        data={getInfinityQueryData(onTheAirData)}
        renderItem={({ item }) => <VerticalItem {...item} />}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id + ""}
        disableVirtualization={false}
      />
    </Container>
  );
};

export default Tvs;
