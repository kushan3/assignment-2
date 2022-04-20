$(function() {

    var $tbody = $('tbody'); // reference <tbody> element on the page
    var $search = $('#filter-search'); // reference to the search input box
    var cache = [ // Create array of cache

    ];
    var lastNameCount = [0, 0]; // initially 0 last names starting with a- m and 0 starting with n - z
    var $buttons = $('#buttons'); // Store buttons

    // this method is asynchronous, so anything that depends on this data needs to be build inside 
    // the done method or in a function that is called AFTER the method is done
    $.getJSON("characters.json").done((data) => {
        // jQuery.each of the players in the array
        $.each(data.character, function(key, val) {
            console.log("data key: ", key, " and data value: ", val);

            var $row = $('<tr></tr>'); // Create their row
            // populate data
            $row.append($('<td></td>').text(val.series));
            $row.append($('<td></td>').text(val.episodes));
            $row.append($('<td></td>').text(val.charcter));
            $row.append($('<td></td>').text(val.season));
            $row.append($('<td></td>').text(val.killer));
            $row.append($('<td></td>').text(val.releaseDate));

            $tbody.append($row); // Add row to the tbody

            cache.push({ // Create the cache that contains several values
                element: $row, // Reference to the row element
                // The text we're searching against (which in this case is first name)
                fname: val.series.trim().toLowerCase(),
                // we only need the first character of the last name for filtering
                lnameFirstCharacter: val.episodes.trim().toLowerCase().charAt(0)
            });

            // add to the count for last names starting with a - m, and n - z
            if ("a" <= val.episodes.trim().toLowerCase().charAt(0) && "m" >= val.episodes.trim().toLowerCase().charAt(0)) {
                lastNameCount[0]++; // index 0 will be for if the last name starts with a - m
            } else { // n - z
                lastNameCount[1]++; // index 1 will be for if the last name starts with n - z
            }
        });

        // after we process each player, we want to add the buttons to the page.
        // We need to build the buttons after the data comes back from the server
        // otherwise lastNameCount at both indexes will alawys be 0 on the page
        $('<button/>', { // Create button
            text: 'A - M (' + lastNameCount[0] + ')', // Add text, and the count for occurances
            click: function() { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((character) => { // Each cache entry
                    // check if character is in range
                    if ("a" <= character.lnameFirstCharacter && "m" >= character.lnameFirstCharacter) {
                        character.element.show();
                    } else { // not in range, hide this chess player
                        character.element.hide();
                    }
                });


            }
        }).appendTo($buttons); // Add to buttons

        $('<button/>', { // Create button
            text: `N - Z (${lastNameCount[1]})`, // Add text
            click: function() { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((character) => { // Each cache entry
                    // check if character is in range
                    if ("n" <= character.lnameFirstCharacter && "z" >= character.lnameFirstCharacter) {
                        character.element.show();
                    } else {
                        character.element.hide();
                    }
                });
            }
        }).appendTo($buttons); // Add to buttons
        var compare = {
            name: function(a, b) {
                console.log("processing the words", b, ", ", a);
                if (a < b) {
                    return -1;
                } else if (b < a) {
                    return 1
                } else //they're equal
                {
                    return 0;
                }
            },
            compareNumbersAscending: function(a, b) {
                // b is the first value being compared, a is the second
                console.log("processing the numbers", b, ", ", a);
                return parseInt(a) - parseInt(b);
            },
            compareNumbersDescending: function(a, b) {
                // b is the first value being compared, a is the second
                console.log("processing the numbers", b, ", ", a);
                return b - a;
            },
            compareNumbersRandom: function(a, b) {
                return 0.5 - Math.random(); // Math.random() returns a value between 0 and 1
            },
            compareDates: function(a, b) {
                var dateA = new Date(a);
                var dateB = new Date(b);
                return dateA - dateB;
            }
        };




        $('.sortable').each(function() {
            let $table = $(this);
            let $tbody = $table.find('tbody');
            let $controls = $table.find('th');
            let rows = $tbody.find('tr').toArray();

            $controls.on('click', function() {
                let $header = $(this);
                let order = $header.find("a").data('sortbythis');
                console.log("order control, ", order);
                let column;
                if ($header.is('.descending')) {
                    $header.removeClass('ascending descending');
                    $header.siblings().removeClass('ascending descending');
                } else if ($header.is('.ascending')) {
                    $header.toggleClass('ascending descending');
                    //revese array
                    $tbody.append(rows.reverse());
                } else {
                    $header.addClass('ascending'); // Add class to header
                    // Remove asc or desc from all other headers
                    $header.siblings().removeClass('ascending descending');
                    if (compare.hasOwnProperty(order)) {
                        console.log("has property");
                        column = $controls.index(this); // Column's index no
                        rows.sort(function(a, b) { // Call sort() on rows
                            a = $(a).find('td').eq(column).text(); // Text of column row a
                            b = $(b).find('td').eq(column).text(); // Text of column row b
                            return compare[order](a, b); // Call compare method
                        });
                        $tbody.append(rows);
                    }
                }
            })
        });
    });




    // method operates on the search input, so the keyword this references the input#filter-search element
    function filter() {
        var query = this.value.trim().toLowerCase(); // Get query
        if (query) { // If there’s a query
            cache.forEach(function(character) { // Each cache entry
                var index = 0; // Set index to 0
                index = character.fname.indexOf(query); // Is text in there?
                if (index != -1) { // we found the string in their first name
                    character.element.addClass("found-first-name"); // we will apply colours based on this class
                } else { // player first name doesn't have the query string, make sure it's not higlighted
                    character.element.removeClass("found-first-name")
                }
            });
        } else { // if the search is empty, nobody should be highlighted
            $('tbody tr').removeClass("found-first-name");
        }
    }
    // if the search input box supports the input event, we want to use it instead of the keyup event
    if ('oninput' in $search[0]) {
        // Use input event to call filter()
        $search.on('input', filter);
    } else { // Otherwise
        // Use keyup event to call filter()
        $search.on('keyup', filter);
    }



});