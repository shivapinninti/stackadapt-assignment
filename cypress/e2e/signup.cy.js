describe('StackAdapt Interview Test', () => {
  it('should navigate to signup page and fill in form', () => {
    // Step 1: Navigate to the initial page and verify page loads
    cy.visit('http://stackadapt-interview.us-east-1.elasticbeanstalk.com/');

    // Step 2: Navigate to signup page
    cy.get('#menu > ul > li:nth-child(1) > a').click();
    cy.url().should('contains', 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/signup');
    
    // Step 3: Fill in form
    const randomName = 'User' + Cypress._.random(1, 100000);
    const randomEmail = randomName.toLowerCase() + '@example.com';
    const randomPassword = 'Password' + Cypress._.random(1, 100000);

    cy.get('#name').type(randomName);
    cy.get('#email').type(randomEmail);
    cy.get('#password').type(randomPassword);
    cy.get('#agree').click();

    // Step 4: Click on the Submit button
    cy.get('#submit').click();

    // Step 5: Store the creds as cookies
    cy.setCookie('savedUsername', randomEmail);
    cy.setCookie('savedPassword', randomPassword);

  
    // Step 6: Add a task
    cy.visit('http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/my_tasks');
    cy.visit('http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/add_task');
    cy.get('#task').type('first task');
    cy.get('#submit').click();
    cy.url().should('contains', 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/my_tasks');
    
    // Step: Logout the logged in user
    cy.xpath('/html/body/div/div/div[1]/div/ul/div/ul/li[2]').click();
    cy.xpath('//*[@id="menu"]/ul/li[2]/div/a[3]').click();
    cy.url().should('contains', 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/');

    // Step: Verify existing user is able to login
    cy.visit('http://stackadapt-interview.us-east-1.elasticbeanstalk.com/login');
    cy.get('#login').click();
    cy.get('#login').type(randomEmail);
    cy.get('#password').type(randomPassword);
    cy.get('.checkbox > label').click();
    cy.get('#remember').click();
    cy.get('#submit').click();
    cy.url().should('contains', 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/my_tasks');

    // Step: Delete a task
    cy.get('body > div > div > div.container > div > div > table > tbody > tr > td:nth-child(2) > div > a.btn.btn-outline-danger').click();

  });
});
