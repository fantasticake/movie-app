import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import api from "../api";
import HeartButton from "../Components/HeartButton";
import HorizontalList from "../Components/HorizontalList";
import { getImageUri, getInfinityQueryData, getNextPageParam } from "../utils";

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.style.backgroundColor};
  flex: 1;
`;

const BgImg = styled.Image`
  position: absolute;
  height: ${WINDOW_HEIGHT / 3}px;
  width: 100%;
`;

const TopBox = styled.View`
  flex-direction: row;
  margin-top: ${WINDOW_HEIGHT / 5}px;
  height: ${WINDOW_HEIGHT / 4.2}px;
  width: 90%;
`;

const Poster = styled.Image`
  height: 100%;
  width: 33%;
  margin-right: 15px;
  border-radius: 8px;
`;

const HeartContainer = styled.View`
  position: absolute;
  bottom: 5px;
  left: 25%;
`;

const Title = styled.Text`
  padding: 5px 0;
  width: ${WINDOW_WIDTH * 0.5}px;
  color: ${(props) => props.theme.style.textColor};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  align-self: flex-end;
`;

const Overview = styled.Text`
  margin-top: 30px;
  color: ${(props) => props.theme.style.subTextColor};
  padding: 0 20px;
  margin-bottom: 20px;
  line-height: 30px;
`;

const Detail = ({
  route: {
    params: { id, title, name, backdrop_path, poster_path, overview },
  },
}) => {
  const isMovie = title ? true : false;
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["movies", "detail", id],
    isMovie ? api.movies.similar : api.tvs.similar,
    { getNextPageParam }
  );
  return (
    <Container
      contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
    >
      <BgImg source={{ uri: getImageUri(backdrop_path) }} />
      <TopBox>
        <Poster source={{ uri: getImageUri(poster_path) }} />
        <HeartContainer>
          <HeartButton
            mediaType={isMovie ? "movies" : "tvs"}
            contentId={id}
            title={title}
            name={name}
            poster_path={poster_path}
            overview={overview}
            backdrop_path={backdrop_path}
          />
        </HeartContainer>
        <Title>{title || name}</Title>
      </TopBox>
      <Overview>{overview}</Overview>
      {isLoading ? null : (
        <HorizontalList
          name={isMovie ? "추천 영화" : "추천 프로그램"}
          data={getInfinityQueryData(data)}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </Container>
  );
};

export default Detail;
