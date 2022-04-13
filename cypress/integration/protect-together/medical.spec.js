describe('Medical Authentication', () => {

    it('Login and Logout', () => {
        cy.logout()
        cy.get('body').then(body => {
            if (body.find('nav').length === 0) {
                cy.get('[name="email"]').type(Cypress.env('CYPRESS_MEDICAL_EMAIL'), {log: false})
                cy.get('[name="password"]').type(Cypress.env('CYPRESS_MEDICAL_PASSWORD'), {log: false})
                cy.get('button').click();
                cy.url().should("contain", '/dashboard')
                cy.contains('Welcome Dr. Demo')
                cy.get('nav').find('button').should("contain", 'Logout').click()
            }
        })
    })
})

describe('Sprint 3 Medical Suite', () => {

    before(() => {
        cy.medicalLogin()
    })

    it('Medical dashboard', () => {
        cy.visit('/')
        cy.contains('Welcome Dr. Demo')
        cy.get('span').contains('View Appointments')
        cy.get('[type="text"]').click().type('Cypress')
        // cy.contains('Cypress System Tests')
    })

    after(() => {
        cy.logout()
    })

})

describe('Sprint 4 Medical Suite', () => {

    before(() => {
        cy.medicalLogin()
    })


    it('Medical dashboard', () => {
        cy.visit('/')
        cy.contains('Dashboard').click()
        cy.contains('5').click()
        cy.contains('10').click()
        cy.contains('Name').click()
        cy.contains('Age').click()
        cy.contains('Appointment Dates').click()
        cy.contains('Status').click()
        cy.contains('Severity').click()
        cy.contains('Latest Symptoms').click()
        cy.contains('View Appointments').click()
        cy.get('body').click(0,0);
        cy.get('[data-testid="NotificationsNoneOutlinedIcon"]').eq(0).click()
        cy.contains('No notifications')
        cy.get('body').click(0,0);
    })

    it('Patient Profile', () => {
        cy.visit('/')
        cy.contains('Patient 2').click()
        cy.contains('Patient 2')
        cy.contains('RAMQ MANSOKS0002')
        cy.contains('Patient\'s Info')
        cy.contains('Latest Symptoms')
        cy.contains('Messages')
        cy.contains('History')
        cy.get('body').click(0,0);
    })

    it('Medical Chat', () => {
        cy.visit('/')
        cy.contains('Patient 2').click()
        cy.get('[class="message-input"]').click().type("Hi Patient")
        cy.get('[data-testid="SendIcon"]').click()
        cy.get('.message.sent').should('contain','Hi Patient')
    })

    it('Close Patient\'s File', () => {
        cy.visit('/')
        cy.contains('Patient 2').click()
        cy.contains('Close Patient\'s File').click()
        cy.contains('Keep Patient\'s File')
        cy.contains('Close Patient\'s File')
    })
    it('View Appointments', () => {
        cy.visit('/')
        cy.contains('Patient 2').click()
        cy.contains('View Appointments').click()
        cy.get('[aria-haspopup="listbox"]').click()
        cy.get('[data-value="Patient 2 Demo"]').click()
        cy.contains('No Upcoming Appointments')
        cy.contains('No Previous Appointments')
    })

    after(() => {
        cy.logout()
    })

})
