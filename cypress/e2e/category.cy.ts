describe("Page d'accueil", () => {
  it("affiche les catégories de recettes", () => {
    cy.visit("/");
    
    cy.contains("Inspiration thématique").should("be.visible");
    
    cy.get(".category-option").should("have.length.greaterThan", 0);
    cy.get('#root input[placeholder="Rechercher une recette..."]').click();
    cy.get('#root input[placeholder="Rechercher une recette..."]').type('Linguini');
    cy.get('#root form.recipe-search button[type="submit"]').click();
    cy.get('#root input').click();
    cy.get('#root input').clear();
    cy.get('#root input').type('chicken');
    cy.get('#root button[type="submit"]').click();
  });
});
