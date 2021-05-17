An example of how to run tests locally:


1. Download and install Visual Studio Code.
2. Set up protractor on your machine according to https://www.protractortest.org/#/
	a. Download and install Node JS - make sure that Node JS is addded to PATH environment variable.
	b. Download and install protractor - 
		Run command npm install protractor
		Locate direcotry where protractor and webdriver manager is installed "${workspaceFolder}/node_modules/protractor/bin/protractor"
		Open this directory in terminal
		Run command node webdriver-manager update - to update chromedriver
3. Check if test suits tests are uncommented.
4. Run tests.
5. Check results in the new_Reports folder.



