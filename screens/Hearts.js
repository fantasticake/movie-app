import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import styled from "styled-components/native";
import VerticalItem from "../Components/VerticalItem";
import { useRealm } from "../context";

const Container = styled.View`
  background-color: ${(props) => props.theme.style.backgroundColor};
  padding-top: 40px;
  flex: 1;
`;

const Separator = styled.View`
  height: 20px;
`;

const Hearts = () => {
  const realm = useRealm();
  const [heartList, setHeartList] = useState(realm.objects("Heart"));

  useEffect(() => {
    const list = realm.objects("Heart");
    list.addListener(() => setHeartList(realm.objects("Heart")));
    return () => {
      list.removeAllListeners();
    };
  }, []);
  return (
    <Container>
      <FlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        data={heartList}
        renderItem={({ item }) => (
          <VerticalItem
            id={item.contentId}
            title={item.title}
            name={item.name}
            poster_path={item.posterPath}
            overview={item.overview}
            backdrop_path={item.backdropPath}
          />
        )}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={Separator}
        disableVirtualization={false}
      />
    </Container>
  );
};

export default Hearts;
