import React from 'react';
import {shallow } from 'enzyme';
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
  appWrapper.instance().toggleAddRecipeForm = jest.fn()
  appWrapper.instance().forceUpdate() //forceUpdate() is used bc the wrapper instance that has already been rendered is not using this mock function
  //So React does not automatically detect that the method definition has been changed
  const button = appWrapper.find('#add-recipe')

  button.simulate('click')

  expect(appWrapper.instance().toggleAddRecipeForm).toHaveBeenCalled()
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

test('Typing into the recipe name input updates state', () => {
  const appWrapper = shallow(<App />)
  const recipeName = "No Pockets"

  appWrapper.setState({
    isAddRecipeFormDisplayed: true
  })

  appWrapper.find('input[name="newRecipeName"]').simulate("change", {
    target: { name: 'newRecipeName', value: recipeName}
  })

  expect(appWrapper.state().newRecipeName).toEqual(recipeName)
})

test('Typing into the recipe instructions input updates state ', () => {
  const appWrapper = shallow(<App />)
  const recipeInstructions = "Kinda hard to write instructions without knowing what I'm cooking"

  appWrapper.setState({
    isAddRecipeFormDisplayed: true,
  })

  appWrapper.find('textarea[name="newRecipeInstructions"]').simulate("change", { 
    target: { name: 'newRecipeInstructions', value: recipeInstructions }
  })

  expect(appWrapper.state().newRecipeInstructions).toEqual(recipeInstructions)
})

test('Recipe name from recipe in state appears in unordered list', () => {
  const appWrapper = shallow(<App />)
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"
  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }

  appWrapper.setState({recipes: [submittedRecipe]})

  expect(appWrapper.find('li')).toHaveLength(1)
  expect(appWrapper.find('li').text()).toContain("Lean Pockets")
})

test('Adding two recipes should update the li length to be 2 instead of 1 and verify the correct entries have been added', () => {
  const appWrapper = shallow(<App />)
  const name1 = "Lean Pockets"
  const instructions1 = "Place in toaster oven, don't burn"
  const submitted1 = {name: name1, instructions: instructions1}
  const name2 = "Cereal"
  const instructions2 = "Pour in ceral, then pour milk in bowl"
  const submitted2 = {name: name2, instructions: instructions2}

  appWrapper.setState({recipes: [submitted1, submitted2]})

  expect(appWrapper.find('li')).toHaveLength(2)
  expect(appWrapper.find('ul').text()).toContain('Lean Pockets')
  expect(appWrapper.find('ul').text()).toContain('Cereal')
})

test('Submitting two recipes updates state the state', () => {
  const appWrapper = shallow(<App />)
  const name1 = "Lean Pockets"
  const instructions1 = "Place in toaster oven, don't burn"
  const submitted1 = {name: name1, instructions: instructions1}
  const name2 = "Cereal"
  const instructions2 = "Pour in cereal, then pour milk in bowl"
  const submitted2 = {name: name2, instructions: instructions2}

  appWrapper.setState({recipes: [submitted1, submitted2]})

  //Check for the correct name
  expect(appWrapper.state().recipes[0].name).toContain("Lean Pockets")
  expect(appWrapper.state().recipes[1].name).toContain("Cereal")
  //Check for the correct instructions
  expect(appWrapper.state().recipes[0].instructions).toContain("Place in toaster oven")
  expect(appWrapper.state().recipes[1].instructions).toContain("Pour in cereal")
})