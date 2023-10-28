import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
];

const TestScreen = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Khởi tạo giá trị ban đầu

  const onSelect = (option) => {
    setSelectedOption(option.value); // Cập nhật giá trị đã chọn bằng Hooks
  }

  return (
    <View>
      <Text>Choose an option:</Text>
      <RadioGroup
        radioButtons={options}
        onPress={onSelect}
        selectedValue={selectedOption}
      />
      <Text>{selectedOption}</Text> {/* Hiển thị giá trị đã chọn */}
    </View>
  );
}

export default TestScreen;
