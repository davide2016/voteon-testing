var VotePage = function() {
    this.navigate = function() {
        browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Vote/')
    }
    
    this.nameField = element.all(by.id('voter-name-input')).first();
    
    this.voteButton = element(by.id('vote-button'))
    
    this.validationMessage = element.all(by.id('voter-name-required-validation-message')).first() 
    
    this.nightwatchJSVote = element(by.cssContainingText('div .md-list-item-text','NightWatchJS'))
        
}

var ResultsPage = function() {
    this.navigate = function() {
        browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Results/')
    }
    
    this.nightwatchJSDropdown = element(by.cssContainingText('p .ng-binding','NightWatchJS'))
    
    this.proctractorDropdown = element(by.cssContainingText('p .ng-binding','Protractor'))
    
    this.webDriverJSDropdown = element(by.cssContainingText('p .ng-binding','WebDriverJS'))
}


describe('VoteOn demo tests', function() {
    var votePage = new VotePage();
    var resultsPage = new ResultsPage();
    
    
    it('requires a username to vote', function() {
                
        votePage.navigate();
        
        expect(browser.getTitle()).toEqual('Vote On');
        
        votePage.nameField.click;
        votePage.nameField.clear;
        votePage.voteButton.click();
        
        expect(browser.getTitle()).toEqual('Vote On');
        expect(votePage.validationMessage.getText()).toEqual('You must supply a name');
    });
                
    it('verify vote is recorded', function() {
                  
        resultsPage.navigate();

        resultsPage.nightwatchJSDropdown.click();
        resultsPage.proctractorDropdown.click();
        resultsPage.webDriverJSDropdown.click();

        var startCount = element.all(by.repeater('voter in result.Voters'));
        startCount.count().then(function(startCount){
            console.log('Start count is: ', startCount);
            votePage.navigate();

            votePage.nameField.click();
            votePage.nameField.sendKeys("Test");
            votePage.nightwatchJSVote.click();
            votePage.voteButton.click();

            resultsPage.nightwatchJSDropdown.click();
            resultsPage.proctractorDropdown.click();
            resultsPage.webDriverJSDropdown.click();

            var newCount = element.all(by.repeater('voter in result.Voters'));
            newCount.count().then(function(newCount){
                console.log('New count is: ', newCount);
                expect(newCount).toEqual(startCount + 1);
            });                                                           
        });           
    });           
});
