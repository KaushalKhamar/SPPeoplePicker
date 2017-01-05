# SPPeoplePicker




SharePoint client side People picker


Enabling People Picker control on SharePoint 2013/SharePoint 2016/Office 365.






To create people picker user



$("#PeoplePicker1").spPeoplePicker();


$("#PeoplePicker2").spPeoplePicker();






Functionalities


•	Easy to initialize and can work with multiple people picker

.
•	You can get all user’s display name.


•	You can get all user’s IDs to save in people picker column directly(Which is useful when save user in user type column in list)





.
•	Set user value in people picker directly by user IDs(Array of user Ids)


Get all user’s display name



	var userNamesInPeoplePicker1 = $("#PeoplePicker1").getUserNames();


	var userNamesInPeoplePicker2 = $("#PeoplePicker2").getUserNames();






Get all user’s IDs(Return array of user IDs)

	var userIdsInPeoplePicker1 = $("#PeoplePicker1").getUserIDs();


	var userIdsInPeoplePicker2 = $("#PeoplePicker2").getUserIDs();





Set user's name in people picker
	var PeoplePicker1ArrayOfUserIDs = [1,2,3];
	var PeoplePicker2ArrayOfUserIDs = [5];

	$("#PeoplePicker1").SetUserIDs(PeoplePicker1ArrayOfUserIDs);
	$("#PeoplePicker2").SetUserIDs(PeoplePicker2ArrayOfUserIDs);
