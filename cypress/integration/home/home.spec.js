describe("Home Page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("Header contains recipe heading with a message that there are no recipes", () => {
        cy.get('.App-header').should('contain', 'My Recipes')
        cy.get('p').should('contain', 'There are no recipes to list.')
    })

    it("Contains an add recipe button that opens a form when clicked", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click()

        expect(cy.get('#recipe-form')).to.exist
    })

    it("Contains a from with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click().then(() => {
            cy.get('input[name="newRecipeName"]').type("Tofu Scramble Tacos")
            cy.get('textarea[name="newRecipeInstructions"]').type("1. Heat a skillet on medium with a dollop of coconut oil {enter} 2. Warm flour tortillas")
            cy.get('input[type="submit"]').click()
            cy.get('ul').then(() => {
                cy.get('ul').contains("Tofu Scramble Tacos")
            })
        })
    })

    it("Tests to see if multiple recipes are displayed when loaded in", () => {
        const addRecipeButton = cy.get('#add-recipe')
        addRecipeButton.click().then(() => {
            //First Input for list
            cy.get('input[name="newRecipeName"]').type("Tofu Scramble Tacos")
            cy.get('textarea[name="newRecipeInstructions"]').type("1. Heat a skillet on medium with a dollop of coconut oil {enter} 2. Warm flour tortillas")
            cy.get('input[type="submit"]').click()
            
            cy.get('input[name="newRecipeName"]').clear() //Clear the inputs for the next list item to be input
            cy.get('textarea[name="newRecipeInstructions"]').clear()
            
            //Second Input for list
            cy.get('input[name="newRecipeName"]').type("Eggo Waffles")
            cy.get('textarea[name="newRecipeInstructions"]').type("1. Put in toaster and click toaster down. ")
            cy.get('input[type="submit"]').click()
            cy.get('ul').then(() => {
                cy.get('li').contains("Tofu Scramble Tacos")
                cy.get('li').contains("Eggo Waffles")
            })
        })
    })
})