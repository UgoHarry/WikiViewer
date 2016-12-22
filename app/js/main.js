$(function (){
  $('#search-form').submit(function(e){
      e.preventDefault(); //  PREVENT DEFAULT SUBMIT BEHAVIOUR
      $(".search-results ul").empty(); //CLEARS PREVIOUS SEARCH RESULTS
      var searchVal = document.getElementById("search-box").value.toString(); // SEARCH TEXT IN A VARIABLE AND PASS TO getJSON URL
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchVal+"&limit=10&namespace=0&format=json&callback=?", function(data) {
        // FOR EACH DATA ITEM, ADD ITEM TITLE, DESC AND URL TO LIST
        for (var i=1; i < data.length; i++){
          for(var j = 0; j < data[i].length; j++) {
            if (i==1){ // IF IN SECOND ARRAY, CREATE LIST AND ADD TITLE
              var $list = $("<li></li>");
              var $headings = $("<h3></h3>");
              var $links = $("<a></a>");
              $headings.append(data[i][j]);
              //ADD CLASS TO LIST ITEM
              $list.addClass(function() {
                return "item-" + j;
              });
              //ADD HEADING LIST ITEM
              $links.append($headings);
              $list.append($links);
              $(".search-results ul").append($list);
            }
            if (i==2) { // IF IN THIRD ARRAY, FIND CORRESPONDING LIST ITEM AND ADD PARAGRAPH
              var $para = $("<p></p>");
              $para.append(data[i][j]);
              $(".item-"+j + " a").append($para);
            }
            if (i==3) { // IF IN FOURTH ARRAY, FIND CORRESPODING LIST ITEM ADD HREF ATTRIBUTE
              $(".item-" + j + " a").attr("href", data[i][j]);
            }
          }
        }
      });
  });
});
