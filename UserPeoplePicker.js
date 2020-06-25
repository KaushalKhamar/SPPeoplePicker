(function ($) {
    RegisterScriptFiles('clienttemplates.js');
    RegisterScriptFiles('clientforms.js');
    RegisterScriptFiles('clientpeoplepicker.js');
    RegisterScriptFiles('autofill.js');

    function RegisterScriptFiles(filename) {
        var scriptEle = document.createElement('script');
        scriptEle.setAttribute("type", "text/javascript")
        scriptEle.setAttribute("src", "/_layouts/15/" + filename);
        document.getElementsByTagName("head")[0].appendChild(scriptEle)

    }

    function initializePeoplePicker(eleId) {
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, null, schema);
    }

    function GetPeoplePicker(eleId) {
	    if(eleId != undefined){
	        var toSpanKey = eleId + "_TopSpan";
	        var peoplePicker = null;
	        var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
	        for (var propertyName in ClientPickerDict) {
	            if (propertyName == toSpanKey) {
	                peoplePicker = ClientPickerDict[propertyName];
	                break;
	            }
	        }
	        return peoplePicker;
	    }
    }

    function GetPeoplePickerIds(eleId) {
        var peoplePicker = GetPeoplePicker(eleId);
        if (peoplePicker != null) {
            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = [];
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                //userInfo += user['DisplayText'] + ";#";
                var userID = GetPeoplePickerUserID(user.Key);
                userInfo.push(userID);

            }
            return userInfo;
        } else
            return '';
    }

    function GetPeoplePickerNames(eleId) {
        var peoplePicker = GetPeoplePicker(eleId);
        if (peoplePicker != null) {
            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                userInfo += user['DisplayText'] + ";#";
            }
            return userInfo;
        } else
            return '';
    }

    function SetUserInPeoplePicker(eleId, userIDArray) {
        var peoplePicker = GetPeoplePicker(eleId);
        if (peoplePicker != null) {
            userIDArray.forEach(function (item) {
                var userInfo = GetUserInfoByID(item);
                if (userInfo != null) {
                    peoplePicker.AddUserKeys(userInfo.LoginName, false);
                }
            })
        }
    }

    function GetPeoplePickerUserID(userNameString) {
        var itemID = "";
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser",
            method: "POST",
            async: false,
            contentType: "application/json;odata=verbose",
            data: JSON.stringify({
                logonName: userNameString
            }),
            headers: {
                "Accept": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                itemID = data.d.Id;
            },
            error: function (err) {
                console.log(err);
            }
        });
        
        return itemID;
    }

    function GetUserInfoByID(ID) {
        var userInfo = "";
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + ID + ")",
            method: "GET",
            async: false,
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                userInfo = data.d;
            },
            error: function (err) {
                console.log(err);
            }
        });
        return userInfo;
    }

    $.fn.spPeoplePicker = function () {
        var eleId = $(this).attr('id');
        ExecuteOrDelayUntilScriptLoaded(function () {
            initializePeoplePicker(eleId);
        }, 'sp.core.js');
    };
    $.fn.GetUserNames = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerNames(eleId);
        return spUsersInfo.slice(0, -2);
    }
    $.fn.GetUserIDs = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerIds(eleId);
        return spUsersInfo;
    }
    $.fn.SetUserIDs = function (items) {
        if (items.length > 0) {
            var eleId = $(this).attr('id');
            var spUsersInfo = SetUserInPeoplePicker(eleId, items);
            return spUsersInfo;
        }
    }
})(jQuery);
