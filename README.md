# SPPeoplePicker


SharePoint client side People picker

Enabling People Picker control on SharePoint 2013/SharePoint 2016/Office 365.




To create people picker user


	$("#PeoplePicker1").spPeoplePicker();

	$("#PeoplePicker2").spPeoplePicker();



Functionalities

	•	Easy to initialize and can work with multiple people picker

	•	You can get user’s display name.

	•	You can get user’s IDs to save in people picker column directly(Which is useful when save user in user type column in list)





Get all user’s display name

	var userNamesInPeoplePicker1 = $("#PeoplePicker1").getUserNames();

	var userNamesInPeoplePicker2 = $("#PeoplePicker2").getUserNames();



Get all user’s IDs(Return array of user IDs)

	var userIdsInPeoplePicker1 = $("#PeoplePicker1").getUserIDs();

	var userIdsInPeoplePicker2 = $("#PeoplePicker2").getUserIDs();


