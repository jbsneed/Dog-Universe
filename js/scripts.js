var dogRepository = (function() {
  var dogs = [];
  var apiUrl = "https://dog.ceo/api/breeds/list/all";

  function add(dog) {
    dogs.push(dog);
  }

  function getAll() {
    return dogs;
  }

  function loadList() {
    return $.ajax(apiUrl, { method: "GET", dataType: "json" })
      .then(function(responseJSON) {
        console.log(responseJSON);
      })
      .catch(function(err) {
        console.log("Caught an error!");
      });
  }

  function loadDetails(item) {}

  function showDetails(dog) {
    loadDetails(dog).then(function() {
      console.log(dog);
    });
  }

  function addListItem(dog) {
    var $element = $(".dog-list");
    var newLi = $("<li>></li>");
    var button = $("<button>" + dog.name + "</button>");
    newLi.append(button);
    $element.append(newLi);
    button.on("click", function(event) {
      var clickId = $(event.target).text();
      showDetails(clickId);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

dogRepository.loadList().then(function() {
  var dogList = dogRepository.getAll();
  $.each(dogList, function(item) {
    addListItem(item);
  });
});
