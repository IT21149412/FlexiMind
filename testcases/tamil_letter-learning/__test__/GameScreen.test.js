import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './GameScreen';

const Stack = createStackNavigator();

describe('GameScreen', () => {
  it('renders correctly', () => {
    const tree = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'basic' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    expect(tree).toMatchSnapshot();
  });

  it('displays questions for the selected level', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'basic' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    expect(getByText('அ___மா')).toBeTruthy();
    expect(getByText('அப்___')).toBeTruthy();
    expect(getByText('___க்கா')).toBeTruthy();
    expect(getByText('த___பி')).toBeTruthy();
  });

  it('displays no questions available message when no questions are available', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'invalid' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    expect(getByText('No questions available')).toBeTruthy();
  });

  it('allows user to select an answer for each question', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'basic' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    const picker = getByTestId('picker-0');
    fireEvent(picker, 'onValueChange', 'ம்');
    expect(getByText('அமா')).toBeTruthy();
  });

  it('disables submit button until all questions are answered', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'basic' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    const submitButton = getByText('Submit Answers');
    expect(submitButton.props.disabled).toBe(true);
    const picker = getByTestId('picker-0');
    fireEvent(picker, 'onValueChange', 'ம்');
    expect(submitButton.props.disabled).toBe(true);
    const picker2 = getByTestId('picker-1');
    fireEvent(picker2, 'onValueChange', 'பா');
    expect(submitButton.props.disabled).toBe(true);
    const picker3 = getByTestId('picker-2');
    fireEvent(picker3, 'onValueChange', 'அ');
    expect(submitButton.props.disabled).toBe(true);
    const picker4 = getByTestId('picker-3');
    fireEvent(picker4, 'onValueChange', 'ம்');
    expect(submitButton.props.disabled).toBe(false);
  });

  it('submits answers and displays results', async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={GameScreen} initialParams={{ level: 'basic' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    const picker = getByTestId('picker-0');
    fireEvent(picker, 'onValueChange', 'ம்');
    const picker2 = getByTestId('picker-1');
    fireEvent(picker2, 'onValueChange', 'பா');
    const picker3 = getByTestId('picker-2');
    fireEvent(picker3, 'onValueChange', 'அ');
    const picker4 = getByTestId('picker-3');
    fireEvent(picker4, 'onValueChange', 'ம்');
    const submitButton = getByText('Submit Answers');
    fireEvent.press(submitButton);
    await waitFor(() => getByText('Total Marks: 20'));
    expect(getByText('Total Marks: 20')).toBeTruthy();
  });
});