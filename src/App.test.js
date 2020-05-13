import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('toggleAddRecipeForm() modifies is AddRecipeFormDisplayed state value to toggle visibility of a form on the page', () => {

  const appWrapper = shallow(<App />) //Create an App wrapper
  appWrapper.instance().toggleAddRecipeForm() //Run a mock of the toggleAddRecipeForm()

  appWrapper.update() //Update the state
  expect(appWrapper.state().isAddRecipeFormDisplayed).toBeTruthy() //Verify that the boolean state variable is true
  expect(appWrapper.exists("#recipe-form")).toEqual(true) //Verify that the Recipe Form is shown

  appWrapper.instance().toggleAddRecipeForm() //Run the Recipe Form toggling function again
  expect(appWrapper.exists("#recipe-form")).toEqual(false) //Verify that the Recipe Form is not shown
  expect(appWrapper.state().isAddRecipeFormDisplayed).toBeFalsy() //Verify the boolean state variable is true

});

test('The Add Recipe button onClick calls the toggleAddRecipeForm method', () => {
  const appWrapper = shallow(<App />)
  appWrapper.instance().toggleAddRecipeForm = js.fn()
  appWrapper.instance().forceUpdate() //forceUpdate() is used bc the wrapper instance that has already been rendered is not using this mock function
  //So React does not automatically detect that the method definition has been changed
  const button = appWrapper.find('#add-recipe')

  button.simulate('click')

  expect(wrapper.instance().toggleAddRecipeForm).toHaveBeenCalled()
});

test('Submitting the form calls the submitRecipe method', () => {
  const appWrapper = shallow(<App />)
  appWrapper.setState({isAddRecipeFormDisplayed: true})
  appWrapper.instance().submitRecipe = jest.fn()
  appWrapper.instance().forceUpdate()

  appWrapper.find('#recipe-form').simulate("submit")
  expect(appWrapper.instance().submitRecipe).toHaveBeenCalled()
})

test('submitRecipe() modifies the recipes value in state', () => {
  const appWrapper = shallow(<App />)
  const recipeName = "Hot Pockets"
  const recipeInstructions = "Microwave for 60 seconds"
  appWrapper.setState({
    isAddRecipeFormDisplayed: true,
    newRecipeName: recipeName,
    newRecipeInstructions: recipeInstructions
  })
  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }

  const mockPreventDefault = jest.fn()

  appWrapper.find('#recipe-form').simulate("submit", {
    preventDefault: mockPreventDefault
  })
  expect(mockPreventDefault).toHaveBeenCalled()
  expect(appWrapper.state().recipes).toEqual([submittedRecipe])
})