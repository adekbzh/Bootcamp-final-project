// console.log("sanity check", $);
/* let departure1;
const submit = $("submit");

submit.on("click", function () {
    $("#departure1").val(departure1);
    console.log(departure1);
}); */

/* document
    .getElementsByClassName("button")
    .addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "flex";
    });

document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "none";
}); */

$("#button").on("click", function () {
    $(".bg-modal").css({ display: "flex" });
});
$(".close").on("click", function () {
    $(".bg-modal").css({ display: "none" });
});

//click().find(".bg-modal").css("display", "flex");
/*     console.log("connection with clickfunctions")
    //$(".bg-modal").style.display = "flex";
); */
