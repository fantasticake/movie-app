import React from "react";
import styled from "styled-components/native";
import HorizontalItem from "./HorizontalItem";
import { OptimizedFlatList } from "react-native-optimized-flatlist";

const Container = styled.View`
  margin-top: 15px;
  padding: 0 20px;
`;

const Name = styled.Text`
  color: ${(props) => props.theme.style.textColor};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Separartor = styled.View`
  width: 20px;
`;

const HorizontalList = ({ name, data, hasNextPage, fetchNextPage }) => {
  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };
  return (
    <Container>
      <Name>{name}</Name>
      <OptimizedFlatList
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        horizontal
        data={data}
        renderItem={({ item }) => <HorizontalItem {...item} />}
        ItemSeparatorComponent={Separartor}
        keyExtractor={(item) => item.id + ""}
        disableVirtualization={false}
      />
    </Container>
  );
};

export default HorizontalList;
