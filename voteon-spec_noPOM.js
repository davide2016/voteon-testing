describe('VoteOn demo tests', function() {
	
  it('requires a username to vote', function() {
	
	browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Vote/');
		expect(browser.getTitle()).toEqual('Vote On');
		var input = element.all(by.id('voter-name-input')).first();
		input.clear();
		element(by.id('vote-button')).click();
		expect(browser.getTitle()).toEqual('Vote On');
		expect(element.all(by.id('voter-name-required-validation-message')).first().getText()).toEqual('You must supply a name');
	});
	
  it('verify vote is recorded', function() {
	  
	browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Results/');

		element(by.cssContainingText('p .ng-binding','NightWatchJS')).click();
		element(by.cssContainingText('p .ng-binding','Protractor')).click();
		element(by.cssContainingText('p .ng-binding','WebDriverJS')).click();
		
		var startCount = element.all(by.repeater('voter in result.Voters'));
		startCount.count().then(function(startCount){
			console.log('Start count is: ', startCount);
	
	browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Vote/');
	
		var input = element.all(by.id('voter-name-input')).first();
		input.sendKeys('test2');
		element(by.cssContainingText('div .md-list-item-text','NightWatchJS')).click();
		element(by.id('vote-button')).click();	
		
		element(by.cssContainingText('p .ng-binding','NightWatchJS')).click();
		element(by.cssContainingText('p .ng-binding','Protractor')).click();
		element(by.cssContainingText('p .ng-binding','WebDriverJS')).click();
	
		var newCount = element.all(by.repeater('voter in result.Voters'));
		newCount.count().then(function(newCount){
			console.log('New count is: ', newCount);
			expect(newCount).toEqual(startCount + 1);
			});
		});				
	});	
});