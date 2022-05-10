import React, {useState} from 'react';
import { StyleSheet } from 'react-native';


export default function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <SearchBarWrapper>
      <SearchIcon source={require('../assets/search.png')} />
      <SearchInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setValue}
        placeholder="검색어를 입력해 주세요."
        returnKeyType="search"
        returnKeyLabel="search"
        value={value}
      />
    </SearchBarWrapper>
  );
}

const styles = StyleSheet.create({
  SearchBarWrapper : {
    flexDirection: 'row',
    
  },
  SearchInput : {
  },
  SearchIcon : {
  },
});