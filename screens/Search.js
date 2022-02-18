import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import api from "../api";
import HorizontalList from "../Components/HorizontalList";
import { useThemeContext } from "../themes";
import { getNextPageParam, getInfinityQueryData } from "../utils";

const Container = styled.View`
  background-color: ${(props) => props.theme.style.backgroundColor};
  flex: 1;
`;

const Input = styled.TextInput`
  margin: 0 20px;
  height: 40px;
  font-size: 17px;
  margin-top: 80px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.style.backgroundColor};
  border-color: ${(props) => props.theme.style.tabBarActiveTintColor};
  border-width: 1px;
  border-radius: 10px;
  padding: 0 13px;
  color: ${(props) => props.theme.style.textColor};
`;

const Query = styled.Text``;

const Search = () => {
  const theme = useThemeContext();
  const [input, setInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const {
    data: movieData,
    isLoading: isMovieLoading,
    hasNextPage: hasNextPageMovie,
    fetchNextPage: fetchNextPageMovie,
  } = useInfiniteQuery(["movies", "search", input], api.movies.search, {
    getNextPageParam,
    enabled,
  });
  const {
    data: tvData,
    isLoading: isTvLoading,
    hasNextPage: hasNextPageTv,
    fetchNextPage: fetchNextPageTv,
  } = useInfiniteQuery(["tvs", "search", input], api.tvs.search, {
    getNextPageParam,
    enabled,
  });
  const onChangeText = (text) => {
    setInput(text);
    if (!text) setEnabled(false);
    else setEnabled(true);
  };
  return (
    <Container>
      <Input
        placeholder="검색"
        placeholderTextColor={theme.style.tabBarActiveTintColor}
        value={input}
        onChangeText={onChangeText}
      />
      {isMovieLoading || isTvLoading ? (
        <ActivityIndicator color={theme.style.tabBarActiveTintColor} />
      ) : null}
      {movieData && getInfinityQueryData(movieData).length ? (
        <HorizontalList
          name="영화"
          data={getInfinityQueryData(movieData)}
          hasNextPage={hasNextPageMovie}
          fetchNextPage={fetchNextPageMovie}
        />
      ) : null}
      {tvData && getInfinityQueryData(tvData).length ? (
        <HorizontalList
          name="Tv"
          data={getInfinityQueryData(tvData)}
          hasNextPage={hasNextPageTv}
          fetchNextPage={fetchNextPageTv}
        />
      ) : null}
    </Container>
  );
};

export default Search;
