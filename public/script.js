// console.log("sanity check", $);

$("#button").on("click", function () {
    $(".bg-modal").css({ display: "flex" });
});
$(".close").on("click", function () {
    $(".bg-modal").css({ display: "none" });
});

(function () {
    /* let inputField;
    for (var i = 0; i < 5; i++) {
        inputField = $([".departure" + i]);
        console.log("inputfield after loop", inputField);
    }

    console.log("let inputField", inputField); */
    var inputField = $(".departure");
    var cities = [
        "Aberdeen",
        "Alicante",
        "Amsterdam",
        "Asuncion",
        "Barcelona",
        "Belluno",
        "Berlin",
        "Bordeaux",
        "Budapest",
        "Faenza",
        "Lisbon",
        "Lódź",
        "London",
        "Lyon",
        "Madrid",
        "Marseille",
        "Minsk",
        "Moscow",
        "Paris",
        "Porto",
        "Prag",
        "Ravenna",
        "Rennes",
        "Riga",
        "Rome",
        "Valencia",
        "Venice",
        "Verona",
        "Vilnius",
    ];
    var resultsContainer = $("#results-container");
    var arrowDown;

    inputField.on("input", function () {
        var inputValue = inputField.val();
        console.log(inputValue);
        var results = [];
        if (inputValue === "") {
            results = [];
        } else {
            for (var i = 0; i < cities.length; i++) {
                if (
                    cities[i]
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) === 0
                ) {
                    results.push(cities[i]);
                }
                if (results.length === 4) {
                    break;
                }
            }
        }

        var resultsHtml = "";
        if (results.length === 0) {
            console.log(results);
            resultsHtml = "<p>No results for your departure city</p>";
        }
        for (var j = 0; j < results.length; j++) {
            resultsHtml += "<p class='city-search'>" + results[j] + "</p>";
        }

        if (inputValue === "") {
            resultsHtml = "";

            arrowDown = undefined;
        }

        resultsContainer.html(resultsHtml);
    });
    resultsContainer.on("mouseover", "p", function () {
        var p = $(this);
    });
    resultsContainer.on("mouseout", "p", function () {
        var p = $(this);
    });

    resultsContainer.on("mousedown", "p", function () {
        var p = $(this);
        inputField.val(p.html());
        resultsContainer.html("");
    });
})();
//click().find(".bg-modal").css("display", "flex");
/*     console.log("connection with clickfunctions")
    //$(".bg-modal").style.display = "flex";
); */
