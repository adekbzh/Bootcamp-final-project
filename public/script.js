// console.log("sanity check", $);

$("#button").on("click", function () {
    $(".bg-modal").css({ display: "flex" });
});
$(".close").on("click", function () {
    $(".bg-modal").css({ display: "none" });
});

(function () {
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

    // let inputField;
    for (let i = 0; i < 5; i++) {
        let inputField = $(".departure" + i);
        // console.log("inputfield after loop", inputField);

        // var inputField = $(".departure");
        // ===> SEE use let: Einfluss bei loop: Hier wenn let dann kriegen wir jeden einzelnen resultscontainer.
        // ===> Während mit var nicht dann  kriegen mit den container entweder ganz oben oder ganz unten.
        let resultsContainer = $("#results-container" + i);
        var arrowDown;

        inputField.on("input", function () {
            var inputValue = inputField.val();
            console.log(inputValue);
            var results = [];
            if (inputValue === "") {
                results = [];
            } else {
                for (var j = 0; j < cities.length; j++) {
                    if (
                        cities[j]
                            .toLowerCase()
                            .indexOf(inputValue.toLowerCase()) === 0
                    ) {
                        results.push(cities[j]);
                    }
                    if (results.length === 4) {
                        break;
                    }
                }
            }

            var resultsHtml = "";
            if (results.length === 0) {
                console.log(results);
                resultsHtml = "<p class='no-match'>No matching departure</p>";
            }
            for (var q = 0; q < results.length; q++) {
                resultsHtml += "<p class='city-search'>" + results[q] + "</p>";
            }

            if (inputValue === "") {
                resultsHtml = "";

                arrowDown = undefined;
            }

            console.log(resultsContainer);

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
    }

    /*     console.log("let inputField", inputField); */
})();
//click().find(".bg-modal").css("display", "flex");
/*     console.log("connection with clickfunctions")
    //$(".bg-modal").style.display = "flex";
); */
