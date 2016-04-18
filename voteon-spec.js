// Create your tests here against https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Vote/

describe('VoteOn demo tests', function() {
  it('should have the right title', function() {
    browser.get('https://votingapp.azurewebsites.net/Poll/#/94df22b2-ecf5-480c-b558-890c93798bc7/Vote/');

	expect(browser.getTitle()).toEqual('Vote On');
	
	var input = element.all(by.id('voter-name-input')).first();
	input.clear();
	element(by.id('vote-button')).click();
	expect(element.all(by.id('voter-name-required-validation-message')).first().getText()).toEqual('You must supply a name');
	
  });
  
  
});