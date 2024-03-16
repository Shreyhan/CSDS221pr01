$(document).ready(function() {
    // Updates days and cost when anything in schedule is changed
    $("#adults, #check-in, #check-out").change(function() {
        var checkInDate = $("#check-in").val();
        var checkOutDate = $("#check-out").val();
        var days = moment(checkOutDate).diff(moment(checkInDate), "days");
        $("#Days").val(days);
        var adults = $("#adults").val();
        var cost = days * adults * 150;
        $("#Cost").val(cost);
    });

    // Resets all feilds when the reset button is clicked
    $("#resetButton").click(function() {
        $("form")[0].reset();
        toastr["info"]("All Fields have been reset!");
    });

    // Submit button functionality
    $("#submitButton").click(function(event) {
        event.preventDefault();
        var valid = true;
        $(".form-control").each(function() {
            if ($(this).val() === "") {
                $(this).closest(".form-group").addClass("has-error");
                if ($(this).attr("id") == "Cost" || $(this).attr("id") == "Days") {
                    toastr["error"]($(this).attr("id") +  " was not calculated!");
                } else {
                    toastr["error"]("The " + $(this).attr("id") +  " feild is blank!");
                }
                valid = false;
            } else {
                $(this).closest(".form-group").removeClass("has-error");
            }
        });

        var cost = $("#Cost").val();
        if (cost === "") {
            toastr["error"]("Cost was not calculated!");
            valid = false;
        } else if (parseInt(cost, 10) <= 0) {
            toastr["error"]("Cost is invalid, please edit check in and check out dates!");
            valid = false;
        }

        if (valid) {
            toastr["success"]("The form was successfully submitted.");
        }
    });
});
