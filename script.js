require(["dojo/fx", "dojo/dom", "dojo/dom-style", "dojo/on", "dojo/domReady!"],
  function(coreFx, dom, style, on) {
    var dropButton = dom.byId("business-card");
    var slideDownPos = 120;
    var slideLeftPos = 1000;
    var bottomStackPos = 28;
    var originalPos = 0;

    var step1 = coreFx.slideTo({
      node: dropButton,
      top: slideDownPos,
      left: slideLeftPos,
      units: "px",
      onEnd: function(node) {
        style.set(node, "z-index", "-10");
      },
      duration: 300
    });

    var step2 = coreFx.slideTo({
      node: dropButton,
      top: bottomStackPos,
      left: bottomStackPos,
      units: "px",
      onEnd: function(node) {
        style.set(node, "z-index", "10");
        style.set(node, "top", originalPos);
        style.set(node, "left", originalPos);
        node.setAttribute("data-animating", false);
      },
      duration: 300
    });

    on(dropButton, "click", function() {
      // prevent clicking while its animating
      if (dropButton.getAttribute("data-animating") !== "true") {
        dropButton.setAttribute("data-animating", true);
        coreFx.chain([step1, step2]).play();
      }

    });
  });