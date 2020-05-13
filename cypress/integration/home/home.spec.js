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

    
})