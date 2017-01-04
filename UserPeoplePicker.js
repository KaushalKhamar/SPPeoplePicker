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
    // Render and initialize the client-side People Picker.
    function initializePeoplePicker(eleId) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        // Render and initialize the picker. 
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, null, schema);
    }

    function GetPeoplePickerIds(eleId) {
        var toSpanKey = eleId + "_TopSpan";
        var peoplePicker = null;

        // Get the people picker object from the page.
        //var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
        var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
        // Get the people picker object from the page.
        for (var propertyName in ClientPickerDict) {
            if (propertyName == toSpanKey) {
                peoplePicker = ClientPickerDict[propertyName];
                break;
            }
        }
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
        }
        else
            return '';
    }

    
    function GetPeoplePickerNames(eleId) {
        var toSpanKey = eleId + "_TopSpan";
        var peoplePicker = null;

        // Get the people picker object from the page.
        //var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
        var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
        // Get the people picker object from the page.
        for (var propertyName in ClientPickerDict) {
            if (propertyName == toSpanKey) {
                peoplePicker = ClientPickerDict[propertyName];
                break;
            }
        }
        if (peoplePicker != null) {
            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                userInfo += user['DisplayText'] + ";#";
            }
            return userInfo;
        }
        else
            return '';
    }

    function GetPeoplePickerUserID(userNameString) 
    {
        var itemID = "";

            $.ajax({
                url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/siteusers(@v)?@v='" + encodeURIComponent(userNameString) + "'",
                method: "GET",
                async:false,
                headers: { "Accept": "application/json; odata=verbose" },
                success:function(data){
                    itemID = data.d.Id;
                },
                error:function(err){
                    console.log(err);
                }
            });
        
        return itemID;
    }


    $.fn.spPeoplePicker = function () {
        var eleId = $(this).attr('id');
        ExecuteOrDelayUntilScriptLoaded(function () { initializePeoplePicker(eleId); }, 'sp.core.js');
    };

    // Query the picker for user information.
    $.fn.getUserNames = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerNames(eleId);
        return spUsersInfo.slice(0, -2);
    }

    $.fn.getUserIDs = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerIds(eleId);
        return spUsersInfo.slice(0, -2);
    }

})(jQuery);
