import { Dispatch } from "redux";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// hvorfor går det ikke å importere filene?
import { searchInput } from "../Action/Actions";
import { RootStore } from "../store";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import { Overlay } from "react-native-elements";
import SearchSort from "./SearchSort";

export const SearchBaren = () => {
  const dispatch: Dispatch<any> = useDispatch();
  // Annen mulig løsning:
  const searchState = useSelector(
    (state: RootStore) => state.searchReducer.search
  );
  const [search, setSearch] = useState(searchState);
  const handleSubmit = () => dispatch(searchInput(search));

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View>
      <SearchBar
        placeholder="Explore.."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Text></Text>
      {/*<TextInput onChangeText={(text) => setSearch(text)} /> */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button style={styles.button} onPress={handleSubmit} title="Search" />
      </View>
      {search === "" ? (
        <View />
      ) : (
        <Button title="Show filter" onPress={toggleOverlay}></Button>
      )}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <SearchSort />
      </Overlay>
      {/*legg inn filter-logikk*/}
    </View>
  );
};

export default SearchBaren;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
  },
});
