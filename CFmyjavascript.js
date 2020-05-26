// Players select theyre names and color
var playerOne = prompt("Player One Enter Your Name, you will be Blue");
var playerOneColor = "rgb(86, 151, 255)";

var playerTwo = prompt("Player Two Enter Your Name, you will be Red");
var playerTwoColor = "rgb(237, 45, 73)";
var againPress = 1;


var run = true;


// Accessing the board
var board = $("table tr");


// Feedback
function whereWin(rowNum, colNum){
    console.log(name + " won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}


// Check the color in a cell
function change(rowIndex, colIndex, color){
    return board.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}


// Return the color in a cell
function report(rowIndex, colIndex){
    return board.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


// Check the bottom
function bottom(colIndex){
    var colorReport = report(5, colIndex);
    for (var row = 5; row > -1; row--){
        colorReport = report(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}


// The checking function for win in a row
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


// Checks the horizontal lines and send the coordonates to the colorMatchCheck function
function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatchCheck(report(row, col), report(row, col + 1), report(row, col + 2), report(row, col + 3))){
                console.log('horiz');
                whereWin(row + 1, col + 1);
                return true;
            }
            else{
                continue;
            }
        }
    }
}


// Checks the vertical lines and send the coordonates to the colorMatchCheck function
function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatchCheck(report(row, col), report(row + 1, col), report(row + 2, col), report(row + 3, col))){
                console.log('vert');
                whereWin(row + 1, col + 1);
                return true;
            }
            else{
                continue;
            }

        }
    }
}

// Checks the diagonal lines and send the coordonates to the colorMatchCheck function
function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if(colorMatchCheck(report(row, col), report(row + 1, col + 1), report(row + 2, col + 2), report(row + 3, col + 3))){
                console.log('diag');
                whereWin(row + 1, col + 1);
                return true;
            }
            else if(colorMatchCheck(report(row, col), report(row - 1, col + 1), report(row - 2, col + 2), report(row - 3, col + 3))){
                console.log('diag');
                whereWin(row + 1, col + 1);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

// PlayerOne starts the game
var player = 1;
var name = playerOne;
var color = playerOneColor;
$("h3").text(playerOne + " it is your turn, pick a column to drop in!")


// Game logic
$("table button").on('click', function(){
    var col = $(this).closest('td').index();
    var bottomAvail = bottom(col);
    change(bottomAvail, col, color);

    // If win
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(name + ", you have won!");
        $('h3').fadeOut('fast');
        $('h2').replaceWith('<button type="button" class="btn btn-secondary">Play again?</button>');
        $('#scoreBoard').append(againPress + '. ' + name + ' won this game.', '<br>');
        alert(name + ' won!');
        // If play again
        $('button').eq(0).on('click', function(){
            $('table button').css('background-color', 'rgb(128, 128, 128)');
            $('h1').text('Welcome to Connect Four!');
            $('button').eq(0).replaceWith('<h2>The object of this game is to connect four of your chips in a row!</h2>');
            
            if(name === playerOne){
                player = 1;
                name = playerOne;
                color = playerOneColor;
            }
            else{
                player = -1;
                name = playerTwo;
                color = playerTwoColor;
            }
            $('h3').fadeIn('fast');
            $("h3").text(playerOne + " it is your turn, pick a column to drop in!");
            againPress += 1;
            
        })
    }

    // Player change
    player = player*-1;

    if(player === 1){
        name = playerOne;
        $('h3').text(name + ' it is your turn.');
        color = playerOneColor;
    }
    else{
        name = playerTwo;
        $('h3').text(name + ' it is you turn.');
        color = playerTwoColor;
    }
})


// Restart Button
$('#rest').on('click', function(){
    location.reload();
});